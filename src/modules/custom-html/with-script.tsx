'use client'

import { useEffect, useRef, useState } from 'react'
import type { CustomHtml } from '@/sanity/types'

/**
 * @description If the code includes a <script> tag, ensure the script is re-run on each render
 */
export default function ({
	code,
	className,
	...props
}: Partial<CustomHtml['html']> & React.ComponentProps<'div'>) {
	if (!code) return null

	const ref = useRef<HTMLDivElement>(null)
	const [firstRender, setFirstRender] = useState(true)

	useEffect(() => {
		if (firstRender) {
			setFirstRender(false)
		} else {
			const parsed = document.createRange().createContextualFragment(code)
			ref.current?.appendChild(parsed)
		}

		return () => {
			if (ref.current) {
				ref.current.innerHTML = ''
			}
		}
	}, [ref.current, code])

	return <div ref={ref} className={className} {...props} />
}
