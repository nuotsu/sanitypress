import { cn } from '@/lib/utils'
import CTA from './CTA'

export default function CTAList({
	ctas,
	className,
}: React.HTMLAttributes<HTMLParagraphElement> & {
	ctas?: Sanity.CTA[]
}) {
	return (
		<p className={cn('flex flex-wrap items-center gap-x-4 gap-y-2', className)}>
			{ctas?.map((cta, key) => <CTA {...cta} key={key} />)}
		</p>
	)
}
