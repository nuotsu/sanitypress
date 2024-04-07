import { fetchSanity, groq } from '@/lib/sanity'
import Date from '@/ui/Date'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

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
						<Link className="link" href={`/blog/${post.metadata.slug.current}`}>
							{post.title}—
							<Date value={post.publishDate} />
						</Link>
					</li>
				))}
			</ul>
		</section>
	)
}
