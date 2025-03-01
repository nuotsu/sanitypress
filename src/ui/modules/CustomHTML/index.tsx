import moduleProps from '@/lib/moduleProps'
import CSS from './CSS'
import WithScript from './WithScript'
import { stegaClean } from 'next-sanity'
import type { ComponentProps } from 'react'

export default function CustomHTML({
	className,
	html,
	css,
	...props
}: {
	html?: { code: string }
	css?: { code: string }
} & Sanity.Module &
	ComponentProps<'section' | 'script'>) {
	if ((!html?.code && !css?.code) || props?.options?.hidden) return null

	return (
		<>
			<CSS code={stegaClean(css?.code)} />

			{html?.code &&
				(html.code.includes('<script') ? (
					<WithScript
						code={stegaClean(html.code)}
						className={stegaClean(className)}
						{...props}
					/>
				) : (
					<section
						className={stegaClean(className)}
						dangerouslySetInnerHTML={{ __html: stegaClean(html.code) }}
						{...moduleProps(props)}
					/>
				))}
		</>
	)
}
