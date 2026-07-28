import { stegaClean } from 'next-sanity'
import { Module, ModuleProps } from '@/modules'
import type { CustomHtml } from '@/sanity/types'
import CSS from './css'
import WithScript from './with-script'

export default function ({
	className,
	html,
	css,
	...props
}: CustomHtml & ModuleProps) {
	if (!html?.code && !css?.code) return null

	const code = html?.code ? stegaClean(html.code) : undefined
	const cleanedClassName = stegaClean(className)

	return (
		<Module as="div" {...props}>
			{css?.code && <CSS code={stegaClean(css.code)} {...props} />}

			{code &&
				(/<script[\s>]/i.test(code) ? (
					<WithScript code={code} className={cleanedClassName} />
				) : (
					<div
						className={cleanedClassName}
						dangerouslySetInnerHTML={{ __html: code }}
					/>
				))}
		</Module>
	)
}
