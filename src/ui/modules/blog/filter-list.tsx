import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { sanityFetch } from '@/sanity/lib/live'
import { CATEGORIES_QUERY_RESULT } from '@/sanity/types'
import Filter from './filter'

export default async function FilterList() {
	'use cache'
	const { isEnabled: isDraftMode } = await draftMode()
	const { data: categories } = (await sanityFetch({
		query: CATEGORIES_QUERY,
		perspective: isDraftMode ? 'drafts' : 'published',
		stega: isDraftMode,
	})) as { data: CATEGORIES_QUERY_RESULT }

	return (
		<div className="flex flex-wrap items-center gap-2">
			<Filter>All</Filter>

			{categories?.map((category) => (
				<Filter category={category} key={category._id} />
			))}
		</div>
	)
}

const CATEGORIES_QUERY = groq`
	*[
		_type == 'blog.category'
		&& count(*[_type == 'blog.post' && references(^._id)]) > 0
	]|order(title)
`
