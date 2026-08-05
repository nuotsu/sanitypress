import { escapeHTML, toHTML } from '@portabletext/to-html'
import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import { getBlockText } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import {
	getDynamicFetchOptions,
	sanityFetch,
	type DynamicFetchOptions,
} from '@/sanity/lib/live'
import { LINK_QUERY } from '@/sanity/lib/queries'
import type {
	AccordionList,
	BLOG_RSS_QUERY_RESULT,
	Table,
} from '@/sanity/types'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

type RssCtas = Extract<
	NonNullable<BLOG_RSS_QUERY_RESULT['posts'][number]['content']>[number],
	{ _type: 'ctas' }
>

export async function GET() {
	const { perspective } = await getDynamicFetchOptions({
		allowDevPreview: false,
	})
	const { blog, posts } = await getRssData({ perspective })

	const rssXML = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel>
		<title>${blog?.metadata?.title}</title>
		<description>${blog?.metadata?.description}</description>
		<link>${BASE_URL}/${ROUTES.blog}</link>
		<language>en-US</language>
		<lastBuildDate>${new Date().toISOString()}</lastBuildDate>
		${posts.map((post) => Item({ post })).join('')}</channel></rss>`

	return new Response(rssXML, {
		headers: {
			'Content-Type': 'application/rss+xml',
		},
	})
}

function Item({ post }: { post: BLOG_RSS_QUERY_RESULT['posts'][number] }) {
	const url = `${BASE_URL}/${ROUTES.blog}/${post.metadata?.slug?.current}`

	return `<item>
		<title><![CDATA[${escapeHTML(post.title!)}]]></title>
		<description><![CDATA[${escapeHTML(post.metadata?.description ?? '')}]]></description>
		<link>${url}</link>
		<guid isPermaLink="true">${url}</guid>
		${[
			post.publishDate &&
				`<pubDate>${new Date(post.publishDate).toISOString()}</pubDate>`,
			post.categories
				?.map((category) => `<category>${category.title}</category>`)
				.join(''),
			post.author && `<dc:creator>${post.author.name}</dc:creator>`,
			post.metadata?.image &&
				`<enclosure url="${urlFor(post.metadata.image).format('jpg').url()}" length="0" type="image/jpeg" />`,
			post.content &&
				`<content:encoded><![CDATA[${toHTML(post.content, {
					components: {
						marks: {
							code: ({ text }) => `<code>${escapeHTML(text)}</code>`,
						},
						types: {
							image: ({ value: { alt = '', figcaption, ...value } }) =>
								`<figure>${[
									`<img src="${urlFor(value).url()}" alt="${escapeHTML(alt)}" />`,
									figcaption &&
										`<figcaption>${escapeHTML(getBlockText(figcaption))}</figcaption>`,
								]
									.filter(Boolean)
									.join('')}</figure>`,
							code: ({ value: { code } }) =>
								code && `<pre><code>${code}</code></pre>`,
							table: ({ value }: { value: Table }) => {
								const rows = value.rows ?? []
								if (!rows.length) return ''
								const headerCount = Math.max(
									0,
									Math.min(value.headerRows ?? 0, rows.length),
								)
								const headerRows = rows.slice(0, headerCount)
								const bodyRows = rows.slice(headerCount)
								const renderRow = (
									row: NonNullable<Table['rows']>[number],
									tag: 'th' | 'td',
								) =>
									`<tr>${
										row.cells
											?.map(
												(cell) =>
													`<${tag}>${cell.value?.length ? toHTML(cell.value) : ''}</${tag}>`,
											)
											.join('') ?? ''
									}</tr>`
								return `<table>${[
									headerRows.length &&
										`<thead>${headerRows.map((row) => renderRow(row, 'th')).join('')}</thead>`,
									bodyRows.length &&
										`<tbody>${bodyRows.map((row) => renderRow(row, 'td')).join('')}</tbody>`,
								]
									.filter(Boolean)
									.join('')}</table>`
							},
							'custom-html': ({ value: { html } }) => html?.code,
							'accordion-list': ({
								value: { eyebrow, intro, accordions },
							}: {
								value: AccordionList
							}) =>
								[
									eyebrow && `<p>${escapeHTML(eyebrow)}</p>`,
									intro?.length && toHTML(intro),
									accordions
										?.map(
											(a) =>
												`<details${a.open ? ' open' : ''}><summary>${escapeHTML(a.summary ?? 'Details')}</summary>${a.content?.length ? toHTML(a.content) : ''}</details>`,
										)
										.join(''),
								]
									.filter(Boolean)
									.join(''),
							ctas: ({ value }: { value: RssCtas }) =>
								value.ctas
									?.map((cta) => {
										const link = cta.link
										const internal =
											link?.internal && 'slug' in link.internal
												? link.internal
												: null
										const href =
											link?.type === 'internal' && internal?.slug
												? [internal.slug, link.params]
														.filter(Boolean)
														.join('')
												: link?.type === 'external'
													? link.external
													: null
										const label =
											link?.label || internal?.title || link?.external
										if (!href || !label) return null
										return `<a href="${escapeHTML(href)}">${escapeHTML(label)}</a>`
									})
									.filter(Boolean)
									.join(' ') ?? '',
						},
					},
				})}]]></content:encoded>`,
		]
			.filter(Boolean)
			.join('')}
	</item>`
}

async function getRssData({
	perspective,
}: Pick<DynamicFetchOptions, 'perspective'>) {
	'use cache'
	const { data } = await sanityFetch({
		query: BLOG_RSS_QUERY,
		params: { blogDir: ROUTES.blog },
		perspective,
		stega: false,
	})
	return data as BLOG_RSS_QUERY_RESULT
}

const BLOG_RSS_QUERY = groq`{
	'blog': *[_type == 'page' && metadata.slug.current == $blogDir][0]{
		metadata
	},
	'posts': *[_type == 'blog.post' && metadata.noIndex != true]|order(publishDate desc){
		title,
		content[]{
			...,
			_type == 'ctas' => {
				ctas[]{
					...,
					link{ ${LINK_QUERY} }
				}
			}
		},
		publishDate,
		categories[]->{ title },
		author->{ name },
		metadata
	}
}`
