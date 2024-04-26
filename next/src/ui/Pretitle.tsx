import { cn } from '@/lib/utils'

export default function Pretitle({
	className,
	children,
}: React.HTMLProps<HTMLParagraphElement>) {
	if (!children) return null

	return (
		<p className={cn('technical text-ink/50 text-sm', className)}>{children}</p>
	)
}
