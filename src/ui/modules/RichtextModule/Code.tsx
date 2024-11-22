import { codeToHtml, splitLines } from 'shiki'
import ClickToCopy from '@/ui/ClickToCopy'
import css from './Code.module.css'
import { cn } from '@/lib/utils'
import { stegaClean } from 'next-sanity'

export default async function Code({
	value,
}: {
	value?: {
		language: string
		code: string
		filename?: string
		highlightedLines?: number[]
	}
}) {
	if (!value?.code) return null

	const html = await codeToHtml(stegaClean(value.code), {
		lang: value.language,
		theme: 'dark-plus',
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
		<article className="group relative !mb-2 !mt-6 rounded bg-ink/5">
			{value.filename && (
				<div className="-mb-1 rounded-t bg-[#1E1E1E]/90 px-2 py-1 font-mono text-xs text-canvas">
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
						'anim-fade-to-l absolute right-0 top-0 m-1 hidden rounded p-[.3em] text-lg text-white',
						'hover:bg-white/10 active:scale-95 active:bg-white/20 group-hover:block',
					)}
				/>
			</div>
		</article>
	)
}
