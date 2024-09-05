import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { PortableText } from '@portabletext/react'
import Filtering from '@/ui/modules/blog/BlogList/Filtering'
import List from './List'
import { stegaClean } from '@sanity/client/stega'
import { cn } from '@/lib/utils'

export default async function BlogList({
	intro,
	layout,
	limit = null,
	displayFilters,
	filteredCategory,
}: Partial<{
	intro: any
	layout: 'grid' | 'carousel'
	limit: number | null
	displayFilters: boolean
	filteredCategory: Sanity.BlogCategory
}>) {
	const posts = await fetchSanity<Sanity.BlogPost[]>(
		groq`
			*[
				_type == 'blog.post'
				${filteredCategory ? `&& $filteredCategory in categories[]->._id` : ''}
			]
			|order(featured desc, publishDate desc)
			${limit ? `[0...${limit}]` : ''}
			{
				...,
				categories[]->
			}
		`,
		{
			params: {
				filteredCategory: filteredCategory?._id || null,
				limit,
			},
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

			{displayFilters && !filteredCategory && <Filtering />}

			<List
				posts={posts}
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
