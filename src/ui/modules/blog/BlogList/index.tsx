import { fetchSanity, groq } from '@/lib/sanity/fetch'
import { PortableText, stegaClean } from 'next-sanity'
import FilterList from '@/ui/modules/blog/BlogList/FilterList'
import List from './List'
import { cn } from '@/lib/utils'

export default async function BlogList({
	intro,
	layout,
	limit = null,
	showFeaturedPostsFirst,
	displayFilters,
	filteredCategory,
}: Partial<{
	intro: any
	layout: 'grid' | 'carousel'
	limit: number | null
	showFeaturedPostsFirst: boolean
	displayFilters: boolean
	filteredCategory: Sanity.BlogCategory
}>) {
	const posts = await fetchSanity<Sanity.BlogPost[]>(
		groq`
			*[
				_type == 'blog.post'
				${filteredCategory ? `&& $filteredCategory in categories[]->._id` : ''}
			]|order(
				${showFeaturedPostsFirst ? 'featured desc, ' : ''}
				publishDate desc
			)
			${limit ? `[0...${limit}]` : ''}
			{
				...,
				categories[]->,
				authors[]->
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

			{displayFilters && !filteredCategory && <FilterList />}

			<List
				posts={posts}
				className={cn(
					'items-stretch gap-x-8 gap-y-12',
					stegaClean(layout) === 'grid'
						? 'grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]'
						: 'carousel max-xl:full-bleed md:overflow-fade-r pb-4 [--size:320px] max-xl:px-4',
				)}
			/>
		</section>
	)
}
