import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import { client } from '@/sanity/lib/client'
import type { LLMS_QUERY_RESULT } from '@/sanity/types'

export async function GET() {
	const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? '').replace(/\/$/, '')

	const { site, home, pages, posts } = await client.fetch<LLMS_QUERY_RESULT>(
		LLMS_QUERY,
		{ blogDir: ROUTES.blog },
	)

	const title = site?.title || (baseUrl && new URL(baseUrl).hostname) || 'Site'
	const mdUrl = (slug: string) => `${baseUrl}/${slug}.md`

	const lines = [
		`# ${title}`,
		...(home?.description ? ['', `> ${home.description}`] : []),
		'',
		'Markdown versions of the pages below are available by appending `.md` to their URL, or via content negotiation with an `Accept: text/markdown` header.',
		...(pages.length
			? [
					'',
					'## Pages',
					'',
					...pages.map(
						(p) =>
							`- [${p.title}](${mdUrl(p.slug ?? '')})${p.description ? ': ' + p.description : ''}`,
					),
				]
			: []),
		...(posts.length
			? [
					'',
					'## Blog Posts',
					'',
					...posts.map(
						(p) =>
							`- [${p.title}](${mdUrl(String(p.slug))})${p.description ? ': ' + p.description : ''}`,
					),
				]
			: []),
		'',
	]

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	})
}

const LLMS_QUERY = groq`{
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
	'posts': *[_type == 'blog.post'
		&& defined(metadata.slug.current)
		&& metadata.noIndex != true
		&& length(markdown.code) > 0
	] | order(publishDate desc) {
		'title': coalesce(title, metadata.title),
		'slug': $blogDir + '/' + metadata.slug.current,
		'description': metadata.description,
	}
}`
