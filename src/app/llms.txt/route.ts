import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import { client } from '@/sanity/lib/client'
import type {
	LLMS_BLOG_QUERY_RESULT,
	LLMS_PAGES_QUERY_RESULT,
} from '@/sanity/types'

export async function GET() {
	const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? '').replace(/\/$/, '')

	const [pages, posts] = await Promise.all([
		client.fetch<LLMS_PAGES_QUERY_RESULT>(LLMS_PAGES_QUERY),
		client.fetch<LLMS_BLOG_QUERY_RESULT>(LLMS_BLOG_QUERY, {
			blogDir: ROUTES.blog,
		}),
	])

	const mdUrl = (slug: string) => `${baseUrl}/${slug}.md`

	const lines = [
		`# ${baseUrl}`,
		'',
		'> AI-readable index of all site content. Each link points to a Markdown version of the page.',
		'',
		'## Pages',
		'',
		...pages.map(
			(p) =>
				`- [${p.title}](${mdUrl(p.slug ?? '')})${p.description ? ': ' + p.description : ''}`,
		),
		'',
		'## Blog Posts',
		'',
		...posts.map(
			(p) =>
				`- [${p.title}](${mdUrl(String(p.slug))})${p.description ? ': ' + p.description : ''}`,
		),
		'',
	]

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	})
}

const LLMS_PAGES_QUERY = groq`
	*[_type == 'page'
		&& defined(metadata.slug.current)
		&& metadata.noIndex != true
		&& metadata.slug.current != 'index'
		&& metadata.slug.current != '404'
	] | order(metadata.slug.current asc) {
		'title': coalesce(metadata.title, metadata.slug.current),
		'slug': metadata.slug.current,
		'description': metadata.description,
	}
`

const LLMS_BLOG_QUERY = groq`
	*[_type == 'blog.post'
		&& defined(metadata.slug.current)
		&& metadata.noIndex != true
	] | order(publishDate desc) {
		'title': coalesce(title, metadata.title),
		'slug': $blogDir + '/' + metadata.slug.current,
		'description': metadata.description,
	}
`
