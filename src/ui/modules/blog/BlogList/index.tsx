import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { PortableText } from '@portabletext/react'
import Filtering from '@/ui/modules/blog/BlogList/Filtering'
import List from './List'
import { stegaClean } from '@sanity/client/stega'
import { cn } from '@/lib/utils'

export default async function BlogList({
	intro,
	layout,
	limit = 100,
	displayFilters,
	predefinedFilters,
}: Partial<{
	intro: any
	layout: 'grid' | 'carousel'
	limit: number
	displayFilters: boolean
	predefinedFilters: Sanity.BlogCategory[]
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

			{displayFilters && <Filtering predefinedFilters={predefinedFilters} />}

			<List
				posts={posts}
				predefinedFilters={predefinedFilters}
				className={cn(
					'gap-x-6 gap-y-12',
					stegaClean(layout) === 'grid'
						? 'grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'
						: 'carousel max-xl:full-bleed md:overflow-fade-r pb-4 [--size:320px] max-xl:px-4',
				)}
			/>
		</section>
	)
}
