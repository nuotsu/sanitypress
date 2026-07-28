'use client'

import { useEffect, useRef } from 'react'
import type { CustomHtml } from '@/sanity/types'

/**
 * @description Re-runs embedded <script> tags on every mount/update, since dangerouslySetInnerHTML never executes them
 */
export default function ({
	code,
	className,
	...props
}: Partial<CustomHtml['html']> & React.ComponentProps<'div'>) {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const el = ref.current
		if (!el || !code) return

		const parsed = document.createRange().createContextualFragment(code)
		el.appendChild(parsed)

		return () => {
			el.innerHTML = ''
		}
	}, [code])

	if (!code) return null

	return <div ref={ref} className={className} {...props} />
}
