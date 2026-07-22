import { groq } from 'next-sanity'
import { sanityFetchLive } from '@/sanity/lib/live'
import { CATEGORIES_QUERY_RESULT } from '@/sanity/types'
import Filter from './filter'

export default async function () {
	const categories = await sanityFetchLive<CATEGORIES_QUERY_RESULT>({
		query: CATEGORIES_QUERY,
	})

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
