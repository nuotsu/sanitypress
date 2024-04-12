import { fetchSanity, groq } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import PostPreview from './PostPreview'

export default async function Rollup({
	content,
}: Partial<{
	content: any
}>) {
	const posts = await fetchSanity<Sanity.BlogPost[]>(
		groq`*[_type == 'blog.post']|order(publishDate desc){
			...,
			categories[]->
		}`,
		{ tags: ['posts'] },
	)

	return (
		<section className="section">
			<header className="richtext">
				<PortableText value={content} />
			</header>

			<ul>
				{posts?.map((post, key) => (
					<li key={key}>
						<PostPreview post={post} />
					</li>
				))}
			</ul>
		</section>
	)
}
