import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import type { Code } from '@/sanity/types'
import {
	CopyButton,
	Filename,
	frameClassName,
	Highlighted,
	menuClassName,
} from './frame'
import { highlight, type CodeTheme } from './highlight'

export default async function ({
	value,
	theme = 'github-dark-high-contrast',
	className,
}: {
	theme?: CodeTheme
	value?: Code
} & ComponentProps<'article'>) {
	if (!value?.code) return null

	const { code, codeAttr, html, filename, filenameAttr } = await highlight(
		value,
		theme,
	)

	return (
		<article className={cn(frameClassName, className)} data-module="code">
			<menu className={menuClassName}>
				<Filename value={filename} className="pl-4" {...filenameAttr} />
				<CopyButton value={code} dark={!theme.includes('light')} />
			</menu>

			<Highlighted html={html} {...codeAttr} />
		</article>
	)
}
