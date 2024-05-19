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
		<div>
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	)
}
