'use client'

import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { cn } from '@/lib/utils'
import css from './InteractiveDetails.module.css'

export default function InteractiveDetails({
	safeAreaOnHover,
	className,
	...props
}: React.DetailsHTMLAttributes<HTMLDetailsElement> & {
	safeAreaOnHover?: boolean
}) {
	const [$open, set$open] = useState(false)

	const events = !isMobile
		? {
				onMouseEnter: () => set$open(true),
				onMouseLeave: () => set$open(false),
			}
		: {}

	return (
		<details
			className={cn(safeAreaOnHover && css.safearea, className)}
			open={$open}
			{...events}
			{...props}
		/>
	)
}
