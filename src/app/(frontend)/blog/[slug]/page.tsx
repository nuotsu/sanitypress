import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { ROUTES } from '@/lib/env'
import { urlFor } from '@/sanity/lib/image'
import {
	getDynamicFetchOptions,
	sanityFetch,
	sanityFetchMetadata,
	sanityFetchStaticParams,
	type DynamicFetchOptions,
} from '@/sanity/lib/live'
import {
	GLOBAL_MODULE_EXCLUDE_QUERY,
	MODULES_QUERY,
} from '@/sanity/lib/queries'
import type { BLOG_POST_QUERY_RESULT } from '@/sanity/types'
import Loading from '@/ui/loading'
import ModulesResolver from '@/ui/modules'

type Props = PageProps<'/blog/[slug]'>

export default async function ({ params }: Props) {
	const { isEnabled: isDraftMode } = await draftMode()

	if (isDraftMode) {
		return (
			<Suspense fallback={<Loading className="section" />}>
				<DynamicPost params={params} />
			</Suspense>
		)
	}

	const { slug } = await params
	return <CachedPost slug={slug} perspective="published" stega={false} />
}

async function DynamicPost({ params }: Pick<Props, 'params'>) {
	const [{ slug }, { perspective, stega }] = await Promise.all([
		params,
		getDynamicFetchOptions(),
	])

	return <CachedPost slug={slug} perspective={perspective} stega={stega} />
}

async function CachedPost({
	slug,
	perspective,
	stega,
}: { slug: string } & DynamicFetchOptions) {
	'use cache'
	const post = await getPost({ slug, perspective, stega })
	if (!post) notFound()

	return <ModulesResolver post={post} perspective={perspective} stega={stega} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const [{ slug }, { perspective }] = await Promise.all([
		params,
		getDynamicFetchOptions(),
	])
	const post = await getPostMetadata({ slug, perspective })
	const { title, description, image, noIndex } = post?.metadata ?? {}

	return {
		title,
		description: description,
		openGraph: {
			title: title,
			description: description,
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
				// Only advertise the .md route when a curated markdown copy exists
				...(post?.markdown?.code && {
					'text/markdown': `/${ROUTES.blog}/${slug}.md`,
				}),
			},
		},
	}
}

export async function generateStaticParams() {
	return (await sanityFetchStaticParams({
		query: groq`*[_type == 'blog.post' && defined(metadata.slug.current)]{
			'slug': '/' + metadata.slug.current
		}`,
	})) as { slug: string }[]
}

async function getPost({
	slug,
	perspective,
	stega,
}: { slug: string } & DynamicFetchOptions) {
	'use cache'
	const { data } = await sanityFetch({
		query: BLOG_POST_QUERY,
		params: { slug, blogDir: `${ROUTES.blog}/` },
		perspective,
		stega,
	})
	return data as BLOG_POST_QUERY_RESULT
}

async function getPostMetadata({
	slug,
	perspective,
}: { slug: string } & Pick<DynamicFetchOptions, 'perspective'>) {
	return (await sanityFetchMetadata({
		query: BLOG_POST_QUERY,
		params: { slug, blogDir: `${ROUTES.blog}/` },
		perspective,
	})) as BLOG_POST_QUERY_RESULT
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
		*[_type == 'global-module' && path == '*' && ${GLOBAL_MODULE_EXCLUDE_QUERY}].before[]{ ${MODULES_QUERY} }
		// path modules (before)
		+ *[_type == 'global-module' && path == $blogDir].before[]{ ${MODULES_QUERY} }
		// path modules (after)
		+ *[_type == 'global-module' && path == $blogDir].after[]{ ${MODULES_QUERY} }
		// global modules (after)
		+ *[_type == 'global-module' && path == '*' && ${GLOBAL_MODULE_EXCLUDE_QUERY}].after[]{ ${MODULES_QUERY} }
	)
}`
