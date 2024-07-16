import { fetchSanity, groq } from '@/lib/sanity/fetch'
import Filter from './Filter'
import css from './Filtering.module.css'
import { cn } from '@/lib/utils'

export default async function Filtering({
	predefinedFilters,
}: {
	predefinedFilters?: Sanity.BlogCategory[]
}) {
	const categories = await fetchSanity<Sanity.BlogCategory[]>(
		groq`*[
			_type == 'blog.category' &&
			count(*[_type == 'blog.post' && references(^._id)]) > 0
		]|order(title)`,
		{ tags: ['categories'] },
	)

	const filtered = categories?.filter(
		(category) =>
			!predefinedFilters?.length ||
			predefinedFilters.some((filter) => filter._id === category._id),
	)

	return (
		<fieldset>
			<legend className="sr-only">Filter by category</legend>

			<div className={cn(css.list, 'filtering group flex flex-wrap gap-1')}>
				<Filter label="All" />

				{filtered?.map((category, key) => (
					<Filter label={category.title} value={category._id} key={key} />
				))}
			</div>
		</fieldset>
	)
}
