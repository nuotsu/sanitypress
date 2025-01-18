'use client'

import { VscCopy } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

export default function ClickToCopy({
	value,
	children,
	className,
	...props
}: {
	value?: string
} & React.ComponentProps<'button'>) {
	return (
		<button
			className={cn('cursor-copy', className)}
			onClick={() => {
				if (typeof window === 'undefined' || !value) return
				navigator.clipboard.writeText(value)
			}}
			title="Click to copy"
			{...props}
		>
			{children || <VscCopy />}
		</button>
	)
}
