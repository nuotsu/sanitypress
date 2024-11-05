'use client'

import { useEffect, useState, type ComponentProps } from 'react'
import { isMobile } from 'react-device-detect'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import css from './InteractiveDetails.module.css'

/**
 * @param safeAreaOnHover - Adds a safe area around the details element to prevent it from closing when the mouse leaves the element
 * @param closeAfterNavigate - Closes the details element after a navigation event
 */
export default function InteractiveDetails({
	safeAreaOnHover,
	closeAfterNavigate,
	className,
	...props
}: {
	safeAreaOnHover?: boolean
	closeAfterNavigate?: boolean
} & ComponentProps<'details'>) {
	const [$open, set$open] = useState(false)

	const events = !isMobile
		? {
				onMouseEnter: () => set$open(true),
				onMouseLeave: () => set$open(false),
			}
		: {}

	// Close after navigation
	const pathname = usePathname()
	useEffect(() => {
		if (closeAfterNavigate) set$open(false)
	}, [pathname])

	return (
		<details
			className={cn(safeAreaOnHover && css.safearea, className)}
			open={$open}
			key={String($open)}
			{...events}
			{...props}
		/>
	)
}
