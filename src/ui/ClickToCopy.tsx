'use client'

import { useState, type ComponentProps } from 'react'
import { VscCheck, VscCopy } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

export default function ClickToCopy({
	value,
	className,
	children = <VscCopy />,
	childrenWhenCopied = <VscCheck />,
	...props
}: {
	value?: string
	childrenWhenCopied?: React.ReactNode
} & ComponentProps<'button'>) {
	const [copied, setCopied] = useState(false)

	return (
		<button
			className={cn('cursor-copy', copied && 'pointer-events-none', className)}
			onClick={() => {
				if (typeof window === 'undefined' || !value) return

				navigator.clipboard.writeText(value)

				setCopied(true)
				setTimeout(() => setCopied(false), 1000)
			}}
			title="Click to copy"
			{...props}
		>
			{copied ? childrenWhenCopied : children}
		</button>
	)
}
