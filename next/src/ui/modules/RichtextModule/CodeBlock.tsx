import { codeToHtml, splitLines } from 'shiki'
import css from './CodeBlock.module.css'
import { stegaClean } from '@sanity/client/stega'

export default async function CodeBlock({
	value,
}: {
	value: {
		language: string
		filename?: string
		decorations?: string[]
		code: string
	}
}) {
	const lines = splitLines(value.code)?.length

	const decorations =
		value.decorations
			?.map(stegaClean)
			?.map(Number)
			?.filter((d) => !isNaN(d) && d >= 0 && d < lines) || undefined

	const html = await codeToHtml(value.code, {
		lang: value.language,
		theme: 'github-dark',
		decorations: decorations?.map((d) => {
			return {
				start: { line: d - 1, character: 0 },
				end: { line: d, character: 0 },
				properties: { class: css.highlight },
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
