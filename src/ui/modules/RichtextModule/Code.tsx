import { codeToHtml, splitLines, bundledThemes } from 'shiki'
import ClickToCopy from '@/ui/ClickToCopy'
import css from './Code.module.css'
import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'
import type { ComponentProps } from 'react'

export default async function Code({
	value,
	theme = 'dark-plus',
	className,
}: {
	theme?: keyof typeof bundledThemes
	value?: {
		language: string
		code: string
		filename?: string
		highlightedLines?: number[]
	}
} & ComponentProps<'article'>) {
	if (!value?.code) return null

	const html = await codeToHtml(stegaClean(value.code), {
		lang: value.language,
		theme,
		decorations: value.highlightedLines
			?.map((row) => ({
				row,
				characters: stegaClean(splitLines(value.code)[row - 1]?.[0])?.length,
			}))
			?.filter(({ characters }) => characters > 0)
			?.map(({ row, characters }) => ({
				start: { line: row - 1, character: 0 },
				end: { line: row - 1, character: characters },
				properties: { class: 'highlight' },
			})),
	})

	return (
		<article
			className={cn('group bg-ink/5 relative !mt-6 !mb-2 rounded', className)}
			data-module="code"
		>
			{value.filename && (
				<div className="text-canvas -mb-1 rounded-t bg-[#1E1E1E]/90 px-2 py-1 font-mono text-xs">
					<span className="inline-block rounded-t border-b border-blue-400 bg-[#1E1E1E] px-3 py-2">
						📁 {value.filename}
					</span>
				</div>
			)}

			<div className="relative">
				<div className={css.code} dangerouslySetInnerHTML={{ __html: html }} />

				<ClickToCopy
					value={stegaClean(value.code)}
					className={cn(
						'anim-fade-to-l absolute top-0 right-0 m-1 hidden rounded p-[.3em] text-lg backdrop-blur group-hover:block hover:bg-white/10 active:scale-95 active:bg-white/20 [&.pointer-events-none]:block',
						!theme.includes('light') && 'text-white',
					)}
				/>
			</div>
		</article>
	)
}
