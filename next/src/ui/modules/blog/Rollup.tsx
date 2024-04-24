import { fetchSanity, groq } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import PostPreview from './PostPreview'
import { cn } from '@/lib/utils'

export default async function Rollup({
	content,
	limit = 100,
	layout,
}: Partial<{
	content: any
	limit?: number
	layout: 'grid' | 'carousel'
}>) {
	const posts = await fetchSanity<Sanity.BlogPost[]>(
		groq`*[_type == 'blog.post'][0...$limit]|order(publishDate desc){
			...,
			categories[]->
		}`,
		{
			params: { limit },
			tags: ['posts'],
		},
	)

	return (
		<section className="section space-y-4">
			<header className="richtext">
				<PortableText value={content} />
			</header>

			<ul
				className={cn(
					'gap-6',
					layout === 'grid'
						? 'grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'
						: 'carousel max-md:full-bleed [--size:320px] max-md:px-4',
				)}
			>
				{posts?.map((post, key) => (
					<li key={key}>
						<PostPreview post={post} />
					</li>
				))}
			</ul>
		</section>
	)
}
