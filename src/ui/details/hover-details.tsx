'use client'

import { useVisualEditingEnvironment } from 'next-sanity/hooks'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type ComponentProps } from 'react'
import { useIsDesktop } from '@/hooks/useMatchMedia'
import { cn } from '@/lib/utils'
import BrowserOnly from '@/ui/browser-only'
import css from './hover-details.module.css'

type Props = {
	safeAreaOnHover?: boolean
	closeAfterNavigate?: boolean
	delay?: number
} & ComponentProps<'details'>

/**
 * @param safeAreaOnHover - Adds a safe area around the details element to prevent it from closing when the mouse leaves the element
 * @param closeAfterNavigate - Closes the details element after a navigation event
 */
export default function HoverDetails(props: Props) {
	const { safeAreaOnHover, className, ...fallbackProps } = props

	return (
		<BrowserOnly
			fallback={
				<details
					className={cn(safeAreaOnHover && css.safearea, className)}
					{...fallbackProps}
				/>
			}
		>
			<HoverDetailsClient {...props} />
		</BrowserOnly>
	)
}

function HoverDetailsClient({
	safeAreaOnHover,
	closeAfterNavigate,
	delay,
	className,
	...props
}: Props) {
	const isDesktop = useIsDesktop()
	// Non-null only once <VisualEditing /> mounts, which only happens in draft mode
	const isVisualEditing = useVisualEditingEnvironment() !== null
	const [open, setOpen] = useState(false)
	const timeout = useRef<ReturnType<typeof setTimeout>>(undefined)
	const ref = useRef<HTMLDetailsElement>(null)
	const stopWatchingOverlay = useRef<() => void>(undefined)

	useEffect(() => () => stopWatchingOverlay.current?.(), [])

	const events = isDesktop
		? {
				onMouseEnter: () => {
					clearTimeout(timeout.current)
					stopWatchingOverlay.current?.()

					if (delay) {
						timeout.current = setTimeout(() => setOpen(true), delay)
					} else {
						setOpen(true)
					}
				},
				onMouseLeave: (e: React.MouseEvent) => {
					clearTimeout(timeout.current)

					// In draft mode, moving onto a Visual Editing overlay (e.g. the hover
					// ring around an element inside this dropdown) shouldn't count as
					// leaving: keep it open until the pointer lands outside both.
					if (isVisualEditing && isVisualEditingOverlay(e.relatedTarget)) {
						watchOverlayExit()
						return
					}

					setOpen(false)
				},
			}
		: {}

	function watchOverlayExit() {
		stopWatchingOverlay.current?.()

		const onMouseOver = (e: MouseEvent) => {
			const target = e.target as Node | null
			if (ref.current?.contains(target) || isVisualEditingOverlay(target)) return

			stopWatchingOverlay.current?.()
			setOpen(false)
		}

		document.addEventListener('mouseover', onMouseOver)
		stopWatchingOverlay.current = () => {
			document.removeEventListener('mouseover', onMouseOver)
			stopWatchingOverlay.current = undefined
		}
	}

	// Close after navigation
	const pathname = usePathname()
	useEffect(() => {
		if (closeAfterNavigate) setOpen(false)
	}, [pathname])

	return (
		<details
			ref={ref}
			className={cn(safeAreaOnHover && css.safearea, className)}
			open={open}
			{...events}
			{...props}
			onToggle={(e) => {
				setOpen(e.currentTarget.open)
				props.onToggle?.(e)
			}}
		/>
	)
}

/** Sanity Visual Editing renders its overlays inside `<sanity-visual-editing>` (shadow DOM, so events retarget to the host) */
function isVisualEditingOverlay(target: EventTarget | null) {
	return target instanceof Element && !!target.closest('sanity-visual-editing')
}
