import client from '@/sanity/client'
import { fetchSanity, groq } from '@/sanity/lib/fetch'
import { modulesQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import Modules from '@/ui/modules'
import processMetadata from '@/lib/processMetadata'

export default async function Page({ params }: Props) {
	const page = await getPageTemplate()
	const post = await getPost(await params)

	if (!page)
		throw Error('No `page` document with slug "blog/*" found in the Studio')

	if (!post) notFound()

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
	return await fetchSanity<Sanity.BlogPost>({
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
}

async function getPageTemplate() {
	return await fetchSanity<Sanity.Page>({
		query: groq`*[_type == 'page' && metadata.slug.current == 'blog/*'][0]{
			...,
			modules[]{ ${modulesQuery} },
			metadata { slug }
		}`,
	})
}

type Props = {
	params: Promise<{ slug?: string }>
}
