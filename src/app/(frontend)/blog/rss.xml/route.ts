import { escapeHTML, toHTML } from '@portabletext/to-html'
import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import { getBlockText } from '@/lib/utils'
import { urlFor } from '@/sanity/lib/image'
import { sanityFetchLive } from '@/sanity/lib/live'
import type { BLOG_RSS_QUERY_RESULT } from '@/sanity/types'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export async function GET() {
	const { blog, posts } = await sanityFetchLive<BLOG_RSS_QUERY_RESULT>({
		query: BLOG_RSS_QUERY,
		params: {
			blogDir: ROUTES.blog,
		},
	})

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
							'custom-html': ({ value: { html } }) => html?.code,
						},
					},
				})}]]></content:encoded>`,
		]
			.filter(Boolean)
			.join('')}
	</item>`
}

const BLOG_RSS_QUERY = groq`{
	'blog': *[_type == 'page' && metadata.slug.current == $blogDir][0]{
		metadata
	},
	'posts': *[_type == 'blog.post' && metadata.noIndex != true]|order(publishDate desc){
		title,
		content,
		publishDate,
		categories[]->{ title },
		author->{ name },
		metadata
	}
}`
