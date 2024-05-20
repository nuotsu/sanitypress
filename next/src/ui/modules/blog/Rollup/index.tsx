import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { PortableText } from '@portabletext/react'
import Filtering from '@/ui/modules/blog/Filtering'
import { cn } from '@/lib/utils'
import { stegaClean } from '@sanity/client/stega'
import List from './List'

export default async function Rollup({
	intro,
	limit = 100,
	layout,
	enableFiltering,
}: Partial<{
	intro: any
	layout: 'grid' | 'carousel'
	limit: number
	enableFiltering: boolean
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
		<section className="section space-y-8">
			{intro && (
				<header className="richtext">
					<PortableText value={intro} />
				</header>
			)}

			{enableFiltering && <Filtering />}

			<List
				posts={posts}
				className={cn(
					'gap-6',
					stegaClean(layout) === 'grid'
						? 'grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'
						: 'carousel max-xl:full-bleed [--size:320px] max-xl:px-4',
				)}
			/>
		</section>
	)
}
