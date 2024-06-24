import { cn } from '@/lib/utils'
import CTA from './CTA'

export default function CTAList({
	ctas,
	className,
}: React.HTMLAttributes<HTMLParagraphElement> & {
	ctas?: Sanity.CTA[]
}) {
	if (!ctas?.length) return null

	return (
		<div className={cn('flex flex-wrap items-center gap-[.5em]', className)}>
			{ctas?.map((cta, key) => (
				<CTA className="max-sm:w-full" {...cta} key={key} />
			))}
		</div>
	)
}
