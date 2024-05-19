export default function Categories({
	categories,
}: {
	categories?: Sanity.BlogCategory[]
}) {
	if (!categories?.length) return null

	return (
		<ul className="lowercase">
			{categories.map((category, key) => (
				<li key={key}>
					<span className="opacity-40">#</span>
					{category.title}
				</li>
			))}
		</ul>
	)
}
