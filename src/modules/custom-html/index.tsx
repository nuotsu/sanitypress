import { stegaClean } from 'next-sanity'
import { stegaToAttribute } from '@/lib/stega'
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
	// On the wrapper since scripts may replace inner HTML; `props` can override
	const { cleaned: htmlCode, attr } = stegaToAttribute(html?.code)
	const cssCode = stegaClean(css?.code)

	if (!htmlCode && !cssCode) return null

	const cleanedClassName = stegaClean(className)
	const { code, hasScripts } = deferScripts(htmlCode ?? '')

	return (
		<Module as="div" {...attr} {...props}>
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
