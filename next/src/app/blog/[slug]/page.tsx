import { fetchSanity } from '@/lib/sanity'
import { groq } from 'next-sanity'
import Post from '@/ui/modules/blog/Post'

export default async function Page({ params }: Props) {
	const post = await fetchSanity<Sanity.BlogPost>(
		groq`*[_type == 'blog.post' && metadata.slug.current == $slug][0]{
			...,
			categories[]->
		}`,
		{
			params,
			tags: ['blog.post'],
		},
	)

	return <Post post={post} />
}

export async function generateMetadata({ params }: Props) {
	return await fetchSanity<Sanity.Metadata>(
		groq`*[_type == 'blog.post' && metadata.slug.current == $slug][0].metadata`,
		{ params },
	)
}

export async function generateStaticParams() {
	const slugs = await fetchSanity<string[]>(groq`
		*[_type == 'blog.post'].metadata.slug.current
	`)

	return slugs.map((slug) => ({ slug }))
}

export const dynamicParams = false

type Props = {
	params: { slug?: string }
}
