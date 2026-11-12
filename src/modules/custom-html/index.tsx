import { stegaClean } from 'next-sanity'
import { Module, ModuleProps } from '@/modules'
import type { CustomHtml } from '@/sanity/types'
import { deferScripts } from './utils'
import WithScript from './with-script'

export default function ({
	className,
	html,
	css,
	...props
}: CustomHtml & ModuleProps) {
	const htmlCode = stegaClean(html?.code)
	const cssCode = stegaClean(css?.code)

	if (!htmlCode && !cssCode) return null

	const cleanedClassName = stegaClean(className)
	const { code, hasScripts } = deferScripts(htmlCode ?? '')

	return (
		<Module as="div" {...props}>
			{cssCode && <style>{cssCode}</style>}

			{code &&
				(hasScripts ? (
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
