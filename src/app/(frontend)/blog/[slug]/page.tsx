import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { ROUTES } from '@/lib/env'
import { urlFor } from '@/sanity/lib/image'
import {
	sanityFetch,
	sanityFetchMetadata,
	sanityFetchStaticParams,
} from '@/sanity/lib/live'
import { MODULES_QUERY } from '@/sanity/lib/queries'
import type { BLOG_POST_QUERY_RESULT } from '@/sanity/types'
import ModulesResolver from '@/ui/modules'

type Props = {
	params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params
	return <CachedBlogPost slug={slug} />
}

async function CachedBlogPost({ slug }: { slug: string }) {
	'use cache'
	const { isEnabled: isDraftMode } = await draftMode()
	const { data: post } = (await sanityFetch({
		query: BLOG_POST_QUERY,
		params: { slug, blogDir: `${ROUTES.blog}/` },
		perspective: isDraftMode ? 'drafts' : 'published',
		stega: isDraftMode,
	})) as { data: BLOG_POST_QUERY_RESULT }

	if (!post) notFound()
	return <ModulesResolver post={post} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const [{ slug }, { isEnabled: isDraftMode }] = await Promise.all([
		params,
		draftMode(),
	])
	const perspective = isDraftMode ? 'drafts' : 'published'

	const { data: post } = (await sanityFetchMetadata({
		query: BLOG_POST_QUERY,
		params: { slug, blogDir: `${ROUTES.blog}/` },
		perspective,
	})) as { data: BLOG_POST_QUERY_RESULT }
	const { title, description, image, noIndex } = post?.metadata ?? {}

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/${ROUTES.blog}/${slug}`,
			images: [
				image
					? urlFor(image).width(1200).url()
					: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?slug=${ROUTES.blog}/${slug}`,
			],
		},
		robots: {
			index: noIndex ? false : undefined,
		},
		alternates: {
			types: {
				'application/rss+xml': `/${ROUTES.blog}/rss.xml`,
			},
		},
	}
}

export async function generateStaticParams() {
	const { data } = await sanityFetchStaticParams({
		query: groq`*[_type == 'blog.post' && defined(metadata.slug.current)]{
			'slug': '/' + metadata.slug.current
		}`,
	})
	return data as { slug: string }[]
}

const BLOG_POST_QUERY = groq`*[_type == 'blog.post' && metadata.slug.current == $slug][0]{
	...,
	content[]{
		...,
		_type == 'image' => {
			...,
			asset->
		}
	},
	'contentPlainText': pt::text(content),
	'readTime': length(string::split(pt::text(content), ' ')) / 200,
	'headings': content[style in ['h2', 'h3', 'h4', 'h5', 'h6']]{
		style,
		'text': pt::text(@)
	},
	categories[]->{
		title,
		slug
	},
	author->{
		name,
		image{
			...,
			asset->
		}
	},
	'modules': (
		// global modules (before)
		*[_type == 'global-module' && path == '*'].before[]{ ${MODULES_QUERY} }
		// path modules (before)
		+ *[_type == 'global-module' && path == $blogDir].before[]{ ${MODULES_QUERY} }
		// path modules (after)
		+ *[_type == 'global-module' && path == $blogDir].after[]{ ${MODULES_QUERY} }
		// global modules (after)
		+ *[_type == 'global-module' && path == '*'].after[]{ ${MODULES_QUERY} }
	)
}`
