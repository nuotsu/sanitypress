'use client'

import { useEffect, useRef } from 'react'
import { INERT_SCRIPT_TYPE, ORIGINAL_TYPE_ATTR } from './utils'

/**
 * Server-renders the HTML with executable scripts made inert (see `deferScripts`),
 * then activates each one exactly once after mount. Scripts inserted via
 * innerHTML never run, and native execution on first load would double-run
 * them, so activation is the only execution path.
 */
export default function ({
	code,
	className,
}: {
	code: string
	className?: string
}) {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const inertScripts = ref.current?.querySelectorAll<HTMLScriptElement>(
			`script[type="${INERT_SCRIPT_TYPE}"]`,
		)

		inertScripts?.forEach((inert) => {
			const script = document.createElement('script')

			for (const { name, value } of inert.attributes) {
				if (name === 'type' || name === ORIGINAL_TYPE_ATTR) continue
				script.setAttribute(name, value)
			}

			const type = inert.getAttribute(ORIGINAL_TYPE_ATTR)
			if (type) script.type = type

			// dynamically-inserted external scripts default to async; keep source order
			if (!inert.hasAttribute('async')) script.async = false

			script.text = inert.text
			inert.replaceWith(script)
		})
	}, [code])

	return (
		<div
			ref={ref}
			className={className}
			dangerouslySetInnerHTML={{ __html: code }}
		/>
	)
}
