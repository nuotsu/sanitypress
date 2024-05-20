import { codeToHtml } from 'shiki'

export default async function CodeBlock({
	value,
}: {
	value: {
		language: string
		filename?: string
		code: string
	}
}) {
	const html = await codeToHtml(value.code, {
		lang: value.language,
		theme: 'github-dark',
	})

	return (
		<article className="relative !mb-2 !mt-6 rounded bg-ink/5">
			{value.filename && (
				<div className="p-2 font-mono text-xs">📁 {value.filename}</div>
			)}
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</article>
	)
}
