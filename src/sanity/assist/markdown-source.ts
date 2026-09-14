import { getImageAsset, isImageSource } from '@sanity/asset-utils'
import groq from 'groq'
import { BREADCRUMBS_QUERY } from '@/modules/breadcrumbs/query'
import { CARD_LIST_QUERY } from '@/modules/card-list/query'
import { FORM_MODULE_QUERY } from '@/modules/form-module/query'
import { IMAGE_GALLERY_QUERY } from '@/modules/image-gallery/query'
import { LOGO_LIST_QUERY } from '@/modules/logo-list/query'
import { PERSON_LIST_QUERY } from '@/modules/person-list/query'
import { PROSE_QUERY } from '@/modules/prose/query'
import { QUOTE_LIST_QUERY } from '@/modules/quote-list/query'
import { TABBED_CONTENT_QUERY } from '@/modules/tabbed-content/query'
import { ROUTES } from '@/lib/env'
import { dataset, projectId } from '@/sanity/env'
import { LINK_QUERY } from '@/sanity/lib/fragments'

const PROJECT = { projectId, dataset } as const

// Mirrored from queries.ts so this Studio module does not import next/headers via live.ts.
const GLOBAL_MODULE_EXCLUDE_QUERY = groq`
	select(
		defined(excludePaths) => count(excludePaths[string::startsWith($slug, @)]) == 0,
		true
	)
`

const GLOBAL_MODULE_PATH_QUERY = groq`
	string::startsWith($slug, path)
	&& ${GLOBAL_MODULE_EXCLUDE_QUERY}
`

const SIDEBAR_QUERY = groq`
	...,
	modules[]{
		...,
		_type == 'callout' => {
			ctas[]{
				...,
				link{ ${LINK_QUERY} }
			}
		}
	}
`

const MODULES_QUERY = groq`
	...,
	ctas[]{
		...,
		link{ ${LINK_QUERY} }
	},
	sidebar{ ${SIDEBAR_QUERY} },
	${FORM_MODULE_QUERY},
	${BREADCRUMBS_QUERY},
	${CARD_LIST_QUERY},
	${IMAGE_GALLERY_QUERY},
	${LOGO_LIST_QUERY},
	${PERSON_LIST_QUERY},
	${PROSE_QUERY},
	${QUOTE_LIST_QUERY},
	${TABBED_CONTENT_QUERY},
`

const BLOG_CONTENT_QUERY = groq`
	content[]{
		...,
		_type == 'image' => {
			...,
			asset->
		},
		_type == 'ctas' => {
			ctas[]{
				...,
				link{ ${LINK_QUERY} }
			}
		},
		_type == 'accordion-list' => {
			...,
			accordions[]{
				...,
				content[]{ ... }
			},
			ctas[]{
				...,
				link{ ${LINK_QUERY} }
			}
		}
	}
`

/** Live-page source for Assist markdown generation (CDN URLs + permalinks resolved). */
export const MARKDOWN_SOURCE_QUERY = groq`
	*[_id == $id][0]{
		_type,
		title,
		'metadata': {
			'title': coalesce(metadata.title, title),
			'description': metadata.description,
			'slug': metadata.slug.current
		},
		_type == 'page' => {
			'modules': (
				*[_type == 'global-module' && path == '*' && ${GLOBAL_MODULE_EXCLUDE_QUERY}].before[]{ ${MODULES_QUERY} }
				+ *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_PATH_QUERY}].before[]{ ${MODULES_QUERY} }
				+ modules[]{ ${MODULES_QUERY} }
				+ *[_type == 'global-module' && path != '*' && ${GLOBAL_MODULE_PATH_QUERY}].after[]{ ${MODULES_QUERY} }
				+ *[_type == 'global-module' && path == '*' && ${GLOBAL_MODULE_EXCLUDE_QUERY}].after[]{ ${MODULES_QUERY} }
			)[attributes.hidden != true]
		},
		_type == 'blog.post' => {
			${BLOG_CONTENT_QUERY},
			publishDate,
			'modules': (
				*[_type == 'global-module' && path == '*' && ${GLOBAL_MODULE_EXCLUDE_QUERY}].before[]{ ${MODULES_QUERY} }
				+ *[_type == 'global-module' && path == $blogDir].before[]{ ${MODULES_QUERY} }
				+ *[_type == 'global-module' && path == $blogDir].after[]{ ${MODULES_QUERY} }
				+ *[_type == 'global-module' && path == '*' && ${GLOBAL_MODULE_EXCLUDE_QUERY}].after[]{ ${MODULES_QUERY} }
			)[attributes.hidden != true]
		}
	}
`

type LinkLike = {
	type?: string
	external?: string
	params?: string
	internal?: { slug?: string }
	href?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return !!value && typeof value === 'object' && !Array.isArray(value)
}

function attachHref(node: Record<string, unknown>) {
	const link = node as LinkLike
	if (link.type === 'internal' && link.internal?.slug) {
		link.href = [link.internal.slug, link.params].filter(Boolean).join('')
	} else if (link.type === 'external' && link.external) {
		link.href = link.external
	}
}

function attachCdnUrl(node: Record<string, unknown>) {
	if (!isImageSource(node) && !isImageSource(node.asset)) return
	try {
		const source = isImageSource(node) ? node : node.asset
		node.cdnUrl = getImageAsset(source as never, PROJECT).url
	} catch {
		// Unresolvable / incomplete image stubs — leave without cdnUrl
	}
}

/** Walk the GROQ payload and attach `cdnUrl` / `href` for the Generate prompt. */
export function enrichMarkdownSource<T>(value: T): T {
	if (Array.isArray(value)) {
		return value.map((item) => enrichMarkdownSource(item)) as T
	}

	if (!isRecord(value)) return value

	const next: Record<string, unknown> = {}
	for (const [key, child] of Object.entries(value)) {
		next[key] = enrichMarkdownSource(child)
	}

	attachCdnUrl(next)
	attachHref(next)

	return next as T
}

export async function fetchMarkdownSource(
	client: { fetch: (query: string, params?: Record<string, unknown>) => Promise<unknown> },
	{
		id,
		slug,
	}: {
		id: string
		slug: string
	},
) {
	const data = await client.fetch(MARKDOWN_SOURCE_QUERY, {
		id,
		slug,
		blogDir: `${ROUTES.blog}/`,
	})

	if (!data) return null
	return enrichMarkdownSource(data)
}
