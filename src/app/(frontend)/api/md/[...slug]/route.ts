import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { NextResponse } from 'next/server'
import { AGENT_POSTS_QUERY, formatLinkList } from '@/lib/agent-directions'
import { ROUTES } from '@/lib/env'
import { client } from '@/sanity/lib/client'
import type { BLOG_INDEX_MD_QUERY_RESULT } from '@/sanity/types'

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ slug: string[] }> },
) {
	const slug = (await params).slug.join('/')

	const isBlogPost = slug.startsWith(`${ROUTES.blog}/`)

	const markdown =
		slug === ROUTES.blog
			? await getBlogIndexMarkdown()
			: await client.fetch<string | null>(
					isBlogPost ? BLOG_POST_MD_QUERY : PAGE_MD_QUERY,
					{ slug: isBlogPost ? slug.slice(ROUTES.blog.length + 1) : slug },
				)

	if (!markdown) notFound()

	return new NextResponse(markdown, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
		},
	})
}

// Curated blog page markdown, followed by a generated list of every post's markdown copy
async function getBlogIndexMarkdown() {
	const { markdown, posts } = await client.fetch<BLOG_INDEX_MD_QUERY_RESULT>(
		BLOG_INDEX_MD_QUERY,
		{ slug: ROUTES.blog, blogDir: ROUTES.blog },
	)

	if (!markdown && !posts.length) return null

	return [
		markdown?.trim(),
		posts.length &&
			['## Blog Posts', formatLinkList(posts).join('\n')].join('\n\n'),
	]
		.filter(Boolean)
		.join('\n\n')
		.concat('\n')
}

const BLOG_INDEX_MD_QUERY = groq`{
	'markdown': *[_type == 'page' && metadata.slug.current == $slug][0].markdown.code,
	'posts': ${AGENT_POSTS_QUERY}
}`

const PAGE_MD_QUERY = groq`*[_type == 'page' && metadata.slug.current == $slug][0].markdown.code`

const BLOG_POST_MD_QUERY = groq`*[_type == 'blog.post' && metadata.slug.current == $slug][0].markdown.code`
