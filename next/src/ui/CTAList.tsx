import { cn } from '@/lib/utils'
import CTA from './CTA'

export default function CTAList({
	ctas,
	className,
}: React.HTMLAttributes<HTMLParagraphElement> & {
	ctas?: Sanity.CTA[]
}) {
	return (
		<nav className={cn('flex flex-wrap items-center gap-[.5em]', className)}>
			{ctas?.map((cta, key) => (
				<CTA className="max-sm:w-full" {...cta} key={key} />
			))}
		</nav>
	)
}
