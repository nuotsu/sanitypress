import { VscLoading } from 'react-icons/vsc'
import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

export default function Loading({
	className,
	children,
}: ComponentProps<'div'>) {
	return (
		<aside className={cn('flex items-center gap-2', className)}>
			<VscLoading className="animate-spin" />
			{children || 'Loading...'}
		</aside>
	)
}
