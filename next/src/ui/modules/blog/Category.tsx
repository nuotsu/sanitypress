export default function Category({
	value,
	label,
}: {
	value?: Sanity.BlogCategory
	label?: string
}) {
	return (
		<>
			<span className="opacity-40">#</span>
			{label || value?.title}
		</>
	)
}
