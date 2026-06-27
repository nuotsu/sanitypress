import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { NextResponse } from 'next/server'
import { ROUTES } from '@/lib/env'
import { client } from '@/sanity/lib/client'

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ slug: string[] }> },
) {
	const slug = (await params).slug.join('/')

	const isBlogPost = slug.startsWith(`${ROUTES.blog}/`)

	const markdown = await client.fetch<string | null>(
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

const PAGE_MD_QUERY = groq`*[_type == 'page' && metadata.slug.current == $slug][0].markdown.code`

const BLOG_POST_MD_QUERY = groq`*[_type == 'blog.post' && metadata.slug.current == $slug][0].markdown.code`
