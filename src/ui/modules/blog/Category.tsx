import Link from 'next/link'
import { cn } from '@/lib/utils'

export default function Category({
	value,
	label,
	linked,
}: {
	value?: Sanity.BlogCategory
	label?: string
	linked?: boolean
}) {
	return (
		<Link
			className={cn(
				"before:text-current/50 before:content-['#'] hover:*:underline",
				!linked && 'pointer-events-none',
			)}
			href={{
				pathname: '/blog',
				query: { category: value?.slug.current },
			}}
		>
			<span>{label || value?.title}</span>
		</Link>
	)
}
