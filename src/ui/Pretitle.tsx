import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'

export default function Pretitle({
	className,
	children,
}: React.ComponentProps<'p'>) {
	if (!children) return null

	return (
		<p
			className={cn(
				'technical text-accent/70 dark:text-accent-dark/70',
				className,
			)}
		>
			{stegaClean(children)}
		</p>
	)
}
