import { fetchSanity, groq } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Post from '@/ui/modules/blog/Post'
import processMetadata from '@/lib/processMetadata'

export default async function Page({ params }: Props) {
	const post = await getPost(params)
	if (!post) notFound()
	return <Post post={post} />
}

export async function generateMetadata({ params }: Props) {
	const post = await getPost(params)
	if (!post) notFound()
	return processMetadata(post)
}

async function getPost(params: Props['params']) {
	return await fetchSanity<Sanity.BlogPost>(
		groq`*[_type == 'blog.post' && metadata.slug.current == $slug][0]{
			...,
			'body': select(_type == 'image' => asset->, body),
			'readTime': length(pt::text(body)) / 200,
			'headings': body[style in ['h2', 'h3']]{
				style,
				'text': pt::text(@)
			},
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
