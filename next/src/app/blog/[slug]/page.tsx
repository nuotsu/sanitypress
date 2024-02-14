import { fetchSanity, groq } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Post from '@/ui/modules/blog/Post'

export default async function Page({ params }: Props) {
	const post = await getPost(params)
	if (!post) notFound()
	return <Post post={post} />
}

export async function generateMetadata({ params }: Props) {
	const post = await getPost(params)
	if (!post) notFound()
	return post.metadata
}

async function getPost(params: Props['params']) {
	return await fetchSanity<Sanity.BlogPost>(
		groq`*[_type == 'blog.post' && metadata.slug.current == $slug][0]{
			...,
			categories[]->
		}`,
		{
			params,
			tags: ['blog.post'],
		},
	)
}

type Props = {
	params: { slug?: string }
}
