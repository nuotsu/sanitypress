'use client'

import { useEffect, useRef, useState, type ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import css from './image-gallery.module.css'

export default function Track({
	reverse,
	duration,
	className,
	children,
	...props
}: {
	reverse?: boolean
	duration: number
} & ComponentProps<'div'>) {
	const ref = useRef<HTMLDivElement>(null)
	const [inView, setInView] = useState(false)

	useEffect(() => {
		const el = ref.current
		if (!el) return

		const observer = new IntersectionObserver(
			([entry]) => setInView(!!entry?.isIntersecting),
			{ rootMargin: '100px' },
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [])

	return (
		<div
			ref={ref}
			className={cn(
				css.track,
				reverse && css.reverse,
				!inView && css.paused,
				className,
			)}
			style={{ '--duration': `${duration}s` }}
			{...props}
		>
			{children}
		</div>
	)
}
