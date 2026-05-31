'use client'

import { useLayoutEffect, useRef } from 'react'
import { ModuleProps } from '..'

export default function ({
	code,
	_key = '',
}: {
	code?: string
} & ModuleProps) {
	const ref = useRef<HTMLStyleElement>(null)

	useLayoutEffect(() => {
		if (ref.current) ref.current.media = ''
		return () => {
			if (ref.current) ref.current.media = 'not all'
		}
	}, [])

	if (!code) return null

	return (
		<style
			ref={ref}
			href={`custom-html-${_key}-${encodeURIComponent(code).slice(0, 32)}`}
		>{`
			${code}
		`}</style>
	)
}
