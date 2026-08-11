'use client'

import { useEffect, useRef } from 'react'

export default function ({
	as: As = 'div',
	cssVar = '--element-height',
	...props
}: React.HTMLAttributes<HTMLElement> & {
	as?: React.ElementType
	cssVar?: string
}) {
	const ref = useRef<HTMLElement>(null)

	useEffect(() => {
		if (typeof window === 'undefined') return

		function setHeight() {
			if (!ref.current) return
			document.documentElement.style.setProperty(
				cssVar,
				`${ref.current.offsetHeight ?? 0}px`,
			)
		}
		setHeight()
		window.addEventListener('resize', setHeight)

		return () => window.removeEventListener('resize', setHeight)
	}, [cssVar])

	return <As ref={ref} {...props} />
}
