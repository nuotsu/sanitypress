'use client'

import { VscCopy } from 'react-icons/vsc'

export default function ClickToCopy({
	value,
	children,
	...props
}: {
	value?: string
} & React.ComponentProps<'button'>) {
	return (
		<button
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
