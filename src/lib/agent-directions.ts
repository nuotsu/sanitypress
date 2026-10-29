import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import { client } from '@/sanity/lib/client'
import type { AGENT_DIRECTIONS_QUERY_RESULT } from '@/sanity/types'

export async function getAgentDirections() {
	const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? '').replace(/\/$/, '')

	const { site, home, pages, posts } =
		await client.fetch<AGENT_DIRECTIONS_QUERY_RESULT>(AGENT_DIRECTIONS_QUERY, {
			blogDir: ROUTES.blog,
		})

	const title = site?.title || (baseUrl && new URL(baseUrl).hostname) || 'Site'

	const lines = [
		`# ${title}`,
		...(home?.description ? ['', `> ${home.description}`] : []),
		'',
		'Markdown versions of the pages below are available by appending `.md` to their URL, or via content negotiation with an `Accept: text/markdown` header.',
		...(pages.length ? ['', '## Pages', '', ...formatLinkList(pages)] : []),
		...(posts.length
			? ['', '## Blog Posts', '', ...formatLinkList(posts)]
			: []),
		'',
	]

	return lines.join('\n')
}

/**
 * @description Markdown list items linking to each item's `.md` copy, e.g. `- [Title](https://…/slug.md): description`
 */
export function formatLinkList(
	items: Array<{
		title: string | null
		slug: unknown // typed `unknown` by typegen when built from a GROQ param
		description: string | null
	}>,
) {
	const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? '').replace(/\/$/, '')

	return items.map(
		({ title, slug, description }) =>
			`- [${title}](${baseUrl}/${String(slug ?? '')}.md)${description ? ': ' + description : ''}`,
	)
}

// Blog posts with a curated markdown copy, newest first
// @sanity-typegen-ignore
export const AGENT_POSTS_QUERY = groq`
	*[_type == 'blog.post'
		&& defined(metadata.slug.current)
		&& metadata.noIndex != true
		&& length(markdown.code) > 0
	] | order(publishDate desc) {
		'title': coalesce(title, metadata.title),
		'slug': $blogDir + '/' + metadata.slug.current,
		'description': metadata.description,
	}
`

const AGENT_DIRECTIONS_QUERY = groq`{
	'site': *[_type == 'site'][0]{
		title
	},
	'home': *[_type == 'page' && metadata.slug.current == 'index'][0]{
		'description': metadata.description
	},
	'pages': *[_type == 'page'
		&& defined(metadata.slug.current)
		&& metadata.noIndex != true
		&& metadata.slug.current != '404'
		&& length(markdown.code) > 0
	] | order(metadata.slug.current != 'index', metadata.slug.current asc) {
		'title': select(
			metadata.slug.current == 'index' => coalesce(metadata.title, 'Home'),
			coalesce(metadata.title, metadata.slug.current)
		),
		'slug': metadata.slug.current,
		'description': metadata.description,
	},
	'posts': ${AGENT_POSTS_QUERY}
}`
