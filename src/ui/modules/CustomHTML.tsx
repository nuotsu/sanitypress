'use client'

import moduleProps from '@/lib/moduleProps'
import { stegaClean } from 'next-sanity'
import { useEffect, useRef, useState } from 'react'

export default function CustomHTML({
	className,
	html,
	...props
}: Partial<
	{
		className: string
		html: {
			code: string
		}
	} & Sanity.Module
>) {
	const ref = useRef<HTMLElement>(null)
	const [firstRender, setFirstRender] = useState(true)

	if (!html?.code) return null

	if (!html.code.includes('<script'))
		return (
			<section
				className={stegaClean(className)}
				dangerouslySetInnerHTML={{ __html: stegaClean(html.code) }}
				{...moduleProps(props)}
			/>
		)

	// if includes <script> tag, ensure script is re-run on each render

	useEffect(() => {
		if (firstRender) {
			setFirstRender(false)
		} else {
			const parsed = document
				.createRange()
				.createContextualFragment(stegaClean(html.code))

			ref.current?.appendChild(parsed)
		}
	}, [ref.current, html.code])

	return (
		<section
			ref={ref}
			className={stegaClean(className)}
			{...moduleProps(props)}
		/>
	)
}
