import { stegaClean } from 'next-sanity'
import type { CustomHtml } from '@/sanity/types'
import { Module, ModuleProps } from '..'
import CSS from './css'
import WithScript from './with-script'

export default function ({
	className,
	html,
	css,
	...props
}: CustomHtml & ModuleProps) {
	if (!html?.code && !css?.code) return null

	return (
		<Module as="div" {...props}>
			{css?.code && <CSS code={stegaClean(css.code)} {...props} />}

			{html?.code &&
				(html.code.includes('<script') ? (
					<WithScript
						code={stegaClean(html.code)}
						className={stegaClean(className)}
					/>
				) : (
					<div
						className={stegaClean(className)}
						dangerouslySetInnerHTML={{ __html: stegaClean(html.code) }}
					/>
				))}
		</Module>
	)
}
