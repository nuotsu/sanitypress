import { stegaClean } from 'next-sanity'
import { cn } from '@/lib/utils'

export default function ({
	value,
	className,
	...props
}: { value?: string } & React.ComponentProps<'p'>) {
	if (!value) return null

	return (
		<p
			className={cn('technical eyebrow text-sm text-current/60', className)}
			{...props}
		>
			{stegaClean(value)}
		</p>
	)
}
