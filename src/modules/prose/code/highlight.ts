import { codeToHtml, splitLines, type BundledTheme } from 'shiki'
import { stegaToAttribute } from '@/lib/stega'
import type { Code } from '@/sanity/types'

export type CodeTheme = BundledTheme

// Stega moves to `data-sanity` so Shiki gets clean code and Presentation can still target the fields
export async function highlight(
	value: Code,
	theme: CodeTheme = 'github-dark-high-contrast',
) {
	const { cleaned: code = '', attr: codeAttr } = stegaToAttribute(value.code)
	const { cleaned: filename, attr: filenameAttr } = stegaToAttribute(
		value.filename,
	)

	const lines = splitLines(code)

	const html = await codeToHtml(code, {
		lang: value.language as any,
		theme,
		decorations: value.highlightedLines
			?.map((row) => ({
				row,
				characters: lines[row - 1]?.[0]?.length ?? 0,
			}))
			?.filter(({ characters }) => characters > 0)
			?.map(({ row, characters }) => ({
				start: { line: row - 1, character: 0 },
				end: { line: row - 1, character: characters },
				properties: { class: 'highlight' },
			})),
	})

	return { code, codeAttr, html, filename, filenameAttr }
}
