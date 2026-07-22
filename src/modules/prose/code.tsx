import { stegaClean } from 'next-sanity'
import type { ComponentProps } from 'react'
import { bundledThemes, codeToHtml, splitLines } from 'shiki'
import { cn } from '@/lib/utils'
import type { Code } from '@/sanity/types'
import ClickToCopy from '@/ui/click-to-copy'
import css from './code.module.css'

export default async function ({
	value,
	theme = 'dark-plus',
	className,
}: {
	theme?: keyof typeof bundledThemes
	value?: Code
} & ComponentProps<'article'>) {
	if (!value?.code) return null

	const html = await codeToHtml(stegaClean(value.code), {
		lang: value.language as any,
		theme,
		decorations: value.highlightedLines
			?.map((row) => ({
				row,
				characters: stegaClean(splitLines(value.code!)[row - 1]?.[0])?.length,
			}))
			?.filter(({ characters }) => characters > 0)
			?.map(({ row, characters }) => ({
				start: { line: row - 1, character: 0 },
				end: { line: row - 1, character: characters },
				properties: { class: 'highlight' },
			})),
	})

	const [path, filename] = value.filename?.includes('/')
		? value.filename.split(/(.*)\/(.*)$/).filter(Boolean)
		: [, value.filename]

	return (
		<article
			className={cn('overflow-hidden rounded', className)}
			data-module="code"
		>
			<menu className="text-background gap-ch bg-foreground flex min-h-lh items-center border-b border-current/30 text-sm">
				{value.filename && (
					<li className="line-clamp-1 pl-4 break-all">
						{path && <span className="text-background/50">{path}/</span>}
						<span>{filename}</span>
					</li>
				)}
				<li className="ml-auto shrink-0">
					<ClickToCopy
						value={stegaClean(value.code)}
						className={cn(
							'p-2 text-lg transition-transform not-hover:opacity-50 active:scale-90 [&.copied]:opacity-100',
							!theme.includes('light') && 'text-white',
						)}
					/>
				</li>
			</menu>

			<div
				className={cn(
					css.code,
					'[--highlight-color:var(--color-green-400)] *:p-4',
				)}
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</article>
	)
}
