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
		const el = ref.current
		if (!el) return

		// also catches content changes (e.g. wrapping text, open mobile menu), not just window resizes
		const observer = new ResizeObserver(() => {
			document.documentElement.style.setProperty(
				cssVar,
				`${el.offsetHeight}px`,
			)
		})
		observer.observe(el)

		return () => observer.disconnect()
	}, [cssVar])

	return <As ref={ref} {...props} />
}
