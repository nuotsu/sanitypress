import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'
import { NextResponse, type NextRequest } from 'next/server'
import { NodeHtmlMarkdown } from 'node-html-markdown'
import { parse, type HTMLElement } from 'node-html-parser'
import { ROUTES } from '@/lib/env'
import { client } from '@/sanity/lib/client'
import type { BLOG_POSTS_MD_QUERY_RESULT } from '@/sanity/types'

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string[] }> },
) {
	const slug = '/' + (await params).slug.join('/')

	const host =
		request.headers.get('x-forwarded-host') || request.headers.get('host')
	const proto =
		request.headers.get('x-forwarded-proto') ||
		(process.env.NODE_ENV === 'development' ? 'http' : 'https')

	const htmlResponse = await fetch(`${proto}://${host}${slug}`, {
		headers: { Accept: 'text/html' },
	})

	if (!htmlResponse.ok) notFound()

	const doc = parse(await htmlResponse.text())

	// Next.js streams resolved Suspense content as <div hidden id="S:N"> outside
	// <main>, then swaps via $RC("B:N","S:N") on the client. Resolve them here
	// so the full content is available before we extract <main>.
	doc.querySelectorAll('div[id^="S:"]').forEach((resolved) => {
		const boundaryId = resolved.id.replace('S:', 'B:')
		const boundary = doc.querySelector(`[id="${boundaryId}"]`)
		if (boundary) {
			boundary.replaceWith(parse(resolved.innerHTML))
			resolved.remove()
		}
	})

	const title = doc.querySelector('title')?.text?.trim() ?? ''
	const description =
		doc
			.querySelector('meta[name="description"]')
			?.getAttribute('content')
			?.trim() ?? ''
	const main = doc.querySelector('main')

	if (!main) notFound()

	main.querySelectorAll('[role="status"]').forEach((el) => el.remove())

	const blogSection = main.querySelector('[data-module="blog-index"]')
	if (blogSection) {
		const posts = await client.fetch<BLOG_POSTS_MD_QUERY_RESULT>(
			BLOG_POSTS_MD_QUERY,
			{ blogDir: `/${ROUTES.blog}/` },
		)
		const container =
			blogSection.querySelector('fieldset')?.parentNode ?? blogSection
		container.innerHTML = posts
			.map(
				(post) => `<article>
					<h3><a href="${post.slug}">${post.title}</a></h3>
					${post.description ? `<p>${post.description}</p>` : ''}
					${post.publishDate ? `<time>${post.publishDate}</time>` : ''}
				</article>`,
			)
			.join('')
	}

	const base = `${proto}://${host}`

	// Unwrap next/image optimizer URLs to canonical src for markdown export
	main.querySelectorAll('img[src]').forEach((img) => {
		const src = img.getAttribute('src')
		if (!src) return
		const parsed = URL.canParse(src, base) ? new URL(src, base) : undefined
		let resolved =
			(parsed?.pathname.endsWith('/_next/image') &&
				decodeURIComponent(parsed.searchParams.get('url') ?? '')) ||
			src
		if (resolved.startsWith('/')) resolved = `${base}${resolved}`
		img.setAttribute('src', resolved)
		img.removeAttribute('srcset')
	})

	main.querySelectorAll('a[href]').forEach((a) => {
		const href = a.getAttribute('href')
		if (href?.startsWith('/')) a.setAttribute('href', `${base}${href}`)
	})

	main.querySelectorAll('h1 a, h2 a, h3 a, h4 a, h5 a, h6 a').forEach((a) => {
		if (a.text.trim() === '#') a.remove()
		else a.replaceWith(a.text)
	})

	const frontmatter = [
		'---',
		`title: "${title.replace(/"/g, '\\"')}"`,
		description && `description: "${description.replace(/"/g, '\\"')}"`,
		'---',
	]
		.filter(Boolean)
		.join('\n')

	const markdown = NodeHtmlMarkdown.translate(main.innerHTML)

	return new NextResponse(`${frontmatter}\n\n${markdown}\n`, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
		},
	})
}

const BLOG_POSTS_MD_QUERY = groq`*[_type == 'blog.post'] | order(publishDate desc) {
	title,
	'slug': $blogDir + metadata.slug.current,
	publishDate,
	'description': metadata.description,
}`
