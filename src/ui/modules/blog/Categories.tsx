import Category from './Category'

export default function Categories({
	categories,
	linked,
	...props
}: {
	categories?: Sanity.BlogCategory[]
	linked?: boolean
} & React.ComponentProps<'ul'>) {
	if (!categories?.length) return null

	return (
		<ul {...props}>
			{categories.map((category, key) => (
				<li key={key}>
					<Category value={category} linked={linked} />
				</li>
			))}
		</ul>
	)
}
