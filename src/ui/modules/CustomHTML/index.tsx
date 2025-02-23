import moduleProps from '@/lib/moduleProps'
import WithScript from './WithScript'
import { stegaClean } from 'next-sanity'
import type { ComponentProps } from 'react'

export default function CustomHTML({
	className,
	html,
	...props
}: {
	html?: { code: string }
} & Sanity.Module &
	ComponentProps<'section' | 'script'>) {
	if (!html?.code) return null

	return html.code.includes('<script') ? (
		<WithScript
			code={stegaClean(html.code)}
			className={stegaClean(className)}
			{...props}
		/>
	) : (
		<section
			className={stegaClean(className)}
			{...moduleProps(props)}
			dangerouslySetInnerHTML={{ __html: stegaClean(html.code) }}
		/>
	)
}
