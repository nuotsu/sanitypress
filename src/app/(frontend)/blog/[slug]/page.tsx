import client from '@/lib/sanity/client'
import { sanityFetch, groq } from '@/lib/sanity/fetch'
import { modulesQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'

export default async function Page({ params }: Props) {
	const page = await getPageTemplate()
	const post = await getPost(await params)
	if (!page || !post) notFound()
	return <Modules modules={page?.modules} page={page} post={post} />
}

export async function generateMetadata({ params }: Props) {
	const post = await getPost(await params)
	if (!post) notFound()
	return processMetadata(post)
}

export async function generateStaticParams() {
	const slugs = await client.fetch<string[]>(
		groq`*[_type == 'blog.post' && defined(metadata.slug.current)].metadata.slug.current`,
	)

	return slugs.map((slug) => ({ slug }))
}

async function getPost(params: { slug?: string }) {
	const { data } = await sanityFetch({
		query: groq`*[_type == 'blog.post' && metadata.slug.current == $slug][0]{
			...,
			'body': select(_type == 'image' => asset->, body),
			'readTime': length(string::split(pt::text(body), ' ')) / 200,
			'headings': body[style in ['h2', 'h3']]{
				style,
				'text': pt::text(@)
			},
			categories[]->,
			authors[]->,
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			}
		}`,
		params,
	})

	return data as Sanity.BlogPost
}

async function getPageTemplate() {
	const { data } = await sanityFetch({
		query: groq`*[_type == 'page' && metadata.slug.current == 'blog/*'][0]{
			...,
			modules[]{ ${modulesQuery} },
			metadata { slug }
		}`,
	})

	return data as Sanity.Page
}

type Props = {
	params: Promise<{ slug?: string }>
}
