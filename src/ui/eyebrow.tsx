import { stegaToAttribute } from '@/lib/stega'
import { cn } from '@/lib/utils'

export default function ({
	value,
	className,
	...props
}: { value?: string } & React.ComponentProps<'p'>) {
	if (!value) return null

	const { cleaned, attr } = stegaToAttribute(value)

	return (
		<p
			className={cn('technical eyebrow text-sm text-current/60', className)}
			{...attr}
			{...props}
		>
			{cleaned}
		</p>
	)
}
