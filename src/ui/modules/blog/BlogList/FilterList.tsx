import { fetchSanity, groq } from '@/sanity/lib/fetch'
import Filter from './Filter'
import css from './FilterList.module.css'
import { cn } from '@/lib/utils'

export default async function FilterList() {
	const categories = await fetchSanity<Sanity.BlogCategory[]>({
		query: groq`*[
			_type == 'blog.category' &&
			count(*[_type == 'blog.post' && references(^._id)]) > 0
		]|order(title)`,
	})

	return (
		<fieldset>
			<legend className="sr-only">Filter by category</legend>

			<div
				className={cn(
					css.list,
					'filtering group flex flex-wrap gap-1 max-sm:justify-center',
				)}
			>
				<Filter label="All" />

				{categories?.map((category, key) => (
					<Filter label={category.title} value={category._id} key={key} />
				))}
			</div>
		</fieldset>
	)
}
