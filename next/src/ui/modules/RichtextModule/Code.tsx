import { codeToHtml, splitLines } from 'shiki'
import { stegaClean } from '@sanity/client/stega'
import css from './Code.module.css'

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

	const html = await codeToHtml(value.code, {
		lang: value.language,
		theme: 'dark-plus',
		decorations: value.highlightedLines
			?.map((row) => ({
				row,
				characters: stegaClean(splitLines(value.code)[row - 1]?.[0])?.length,
			}))
			?.filter(({ characters }) => characters > 0)
			?.map(({ row, characters }) => {
				return {
					start: { line: row - 1, character: 0 },
					end: { line: row - 1, character: characters },
					properties: { class: 'highlight' },
				}
			}),
	})

	return (
		<article className="relative !mb-2 !mt-6 rounded bg-ink/5">
			{value.filename && (
				<div className="p-2 font-mono text-xs">📁 {value.filename}</div>
			)}
			<div className={css.code} dangerouslySetInnerHTML={{ __html: html }} />
		</article>
	)
}
