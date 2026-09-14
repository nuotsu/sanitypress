import { useMemo } from 'react'
import {
	defineAssistFieldAction,
	type AssistFieldActionProps,
} from '@sanity/assist'
import { ComposeSparklesIcon } from '@sanity/icons/ComposeSparkles'
import { useToast } from '@sanity/ui/toast'
import { useClient } from 'sanity'
import { fetchMarkdownSource } from './markdown-source'

const MARKDOWN_DOC_TYPES = new Set(['page', 'blog.post'])

/** Assist opens on either the `code` object (`markdown`) or its nested string (`markdown.code`). */
function isMarkdownAssistPath(path: AssistFieldActionProps['path']) {
	if (path[0] !== 'markdown') return false
	return path.length === 1 || (path.length === 2 && path[1] === 'code')
}

function markdownFilename(slug?: string) {
	const base = (slug || 'page').replace(/^\/+|\/+$/g, '') || 'index'
	return `${base.replace(/\//g, '-')}.md`
}

function yamlScalar(value: string) {
	// Prefer plain scalars; quote when YAML would misread the value.
	if (
		/[:#{}[\],&*!|>'"%@`]/.test(value) ||
		/^\s|\s$/.test(value) ||
		/^(true|false|null|~|\d+(\.\d+)?)$/i.test(value)
	) {
		return JSON.stringify(value)
	}
	return value
}

/** Build YAML frontmatter in code so the model cannot emit `title: null`. */
export function buildMarkdownFrontmatter({
	title,
	description,
}: {
	title?: string | null
	description?: string | null
}) {
	const lines = ['---']
	if (title?.trim()) lines.push(`title: ${yamlScalar(title.trim())}`)
	if (description?.trim()) {
		lines.push(`description: ${yamlScalar(description.trim())}`)
	}
	lines.push('---', '')
	return lines.join('\n')
}

type MarkdownDoc = {
	title?: string | null
	markdown?: { language?: string; filename?: string; code?: string }
	metadata?: {
		title?: string | null
		description?: string | null
		slug?: { current?: string }
	}
}

export function useGenerateMarkdownAction(props: AssistFieldActionProps) {
	const {
		actionType,
		documentIdForAction,
		documentSchemaType,
		getConditionalPaths,
		getDocumentValue,
		path,
		schemaId,
	} = props

	const client = useClient({ apiVersion: 'vX' })
	const { push: pushToast } = useToast()

	return useMemo(() => {
		if (actionType !== 'field') return undefined
		if (!MARKDOWN_DOC_TYPES.has(documentSchemaType.name)) return undefined
		if (!isMarkdownAssistPath(path)) return undefined

		return defineAssistFieldAction({
			title: 'Generate markdown',
			icon: ComposeSparklesIcon,
			onAction: async () => {
				const doc = getDocumentValue() as MarkdownDoc
				const slug = doc.metadata?.slug?.current

				if (!slug) {
					pushToast({
						status: 'warning',
						title: 'Missing slug',
						description:
							'Set metadata.slug before generating markdown so permalinks and the .md filename resolve correctly.',
					})
					return
				}

				const source = await fetchMarkdownSource(client, {
					id: documentIdForAction,
					slug,
				})

				if (!source) {
					pushToast({
						status: 'error',
						title: 'Could not load document source',
					})
					return
				}

				const sourceRecord = source as MarkdownDoc
				const title =
					doc.metadata?.title?.trim() ||
					sourceRecord.metadata?.title?.trim() ||
					doc.title?.trim() ||
					sourceRecord.title?.trim() ||
					''
				const description =
					doc.metadata?.description?.trim() ||
					sourceRecord.metadata?.description?.trim() ||
					''

				const frontmatter = buildMarkdownFrontmatter({ title, description })
				const filename = doc.markdown?.filename || markdownFilename(slug)

				// Target the parent `code` object — Agent Actions rejects nested
				// paths like `markdown.code` for the @sanity/code-input type.
				await client.agent.action.generate({
					schemaId,
					documentId: documentIdForAction,
					instruction: `
You are converting Sanity CMS content into a verbatim Markdown document for LLM / agent consumption.

The target field is a Sanity \`code\` object. Set it to:
- _type: "code"
- language: "markdown"
- filename: "${filename}"
- code: <the full markdown document as a single string>

## Frontmatter (required — copy exactly)
The \`code\` string MUST begin with this frontmatter block copied VERBATIM from $frontmatter (do not alter, do not write null, do not invent keys):
$frontmatter
Then continue with the body markdown (no extra blank lines before the body beyond what $frontmatter already ends with).

## Source
$source is a JSON payload already prepared for you (body content only — ignore its metadata for frontmatter; use $frontmatter instead):
- Internal links already have \`href\` (e.g. /foo/bar, /blog/test, /). Never invent paths from _ref.
- Images already have \`cdnUrl\` (Sanity CDN). Never invent or alter CDN URLs — copy \`cdnUrl\` exactly.
- For pages: \`modules\` is the live page assembly (global-before + path-before + page modules + path-after + global-after). Hidden modules are already removed.
- For blog posts: \`content\` is the post body; \`modules\` are global/path modules wrapping the post. When a module has \`_type == "blog-post-content"\`, expand the post \`content\` at that position (that is how the live blog page renders).

## Transcription rules (strict)
- Transcribe reader-facing text VERBATIM: no paraphrasing, no reordering, no dropped sentences.
- Portable Text → markdown: headings (#–####), paragraphs, blockquotes (> ), bullet/numbered lists, **strong**, *em*, \`code\`, links as [text](href).
- Images → ![alt](cdnUrl). If figcaption exists, render an italic caption line beneath: *caption*.
- CTAs → [label](href) using the pre-resolved href (or link.label / link.internal.title for the label).
- Code blocks → fenced blocks with language; if filename is set, put it as a bold label on its own line above the fence. Never alter the code string.
- Tables → GitHub-flavored markdown tables.
- Skip custom-html blocks entirely.
- Skip purely structural/visual fields (attributes, scopedCss, layout, theme, variant, columns, opacity, loading, etc.).
- Skip decorative modules with no narrative (empty logo-lists, search chrome without headings). Prefer prose, heroes, callouts, cards, stats, steps, accordions, galleries, quotes, tabbed content.
- Do not invent content that is not in $source.
                     `,
					instructionParams: {
						frontmatter: {
							type: 'constant',
							value: frontmatter,
						},
						source: {
							type: 'constant',
							value: JSON.stringify(source),
						},
					},
					target: {
						operation: 'set',
						path: ['markdown'],
					},
					conditionalPaths: {
						paths: getConditionalPaths(),
					},
				})
			},
		})
	}, [
		actionType,
		client,
		documentIdForAction,
		documentSchemaType.name,
		getConditionalPaths,
		getDocumentValue,
		path,
		pushToast,
		schemaId,
	])
}
