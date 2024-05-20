import Category from './Category'

export default function Categories({
	categories,
}: {
	categories?: Sanity.BlogCategory[]
}) {
	if (!categories?.length) return null

	return (
		<ul>
			{categories.map((category, key) => (
				<li key={key}>
					<Category value={category} />
				</li>
			))}
		</ul>
	)
}
