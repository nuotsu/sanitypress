import Category from './Category'

export default function Categories({
	categories,
	isLink,
	...props
}: {
	categories?: Sanity.BlogCategory[]
	isLink?: boolean
} & React.ComponentProps<'ul'>) {
	if (!categories?.length) return null

	return (
		<ul {...props}>
			{categories.map((category, key) => (
				<li key={key}>
					<Category value={category} isLink={isLink} />
				</li>
			))}
		</ul>
	)
}
