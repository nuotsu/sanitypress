import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'

export default function Pretitle({
	className,
	children,
}: React.ComponentProps<'p'>) {
	if (!children) return null

	return (
		<p className={cn('technical text-ink/65', className)}>
			{stegaClean(children)}
		</p>
	)
}
