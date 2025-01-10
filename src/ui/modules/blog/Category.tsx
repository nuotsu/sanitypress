import Link from 'next/link'

export default function Category({
	value,
	label,
	isLink,
}: {
	value?: Sanity.BlogCategory
	label?: string
	isLink?: boolean
}) {
	if (isLink)
		return (
			<Link
				className="hover:underline"
				href={{
					pathname: '/blog',
					query: { category: value?.slug.current },
				}}
			>
				<span className="text-accent/40">#</span>
				{label || value?.title}
			</Link>
		)

	return (
		<>
			<span className="text-accent/40 dark:text-neutral-500">#</span>
			{label || value?.title}
		</>
	)
}
