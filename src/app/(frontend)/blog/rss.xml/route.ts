import { fetchSanity, groq } from '@/lib/sanity/fetch'
import processUrl from '@/lib/processUrl'
import { Feed } from 'feed'
import { escapeHTML, toHTML } from '@portabletext/to-html'
import { urlFor } from '@/lib/sanity/urlFor'

export async function GET() {
	const { blog, posts, copyright } = await fetchSanity<{
		blog: Sanity.Page
		posts: Array<Sanity.BlogPost & { image?: string }>
		copyright: string
	}>(
		groq`{
			'blog': *[_type == 'page' && metadata.slug.current == 'blog'][0]{
				_type,
				title,
				metadata,
				'image': metadata.image.asset->url
			},
			'posts': *[_type == 'blog.post']{
				_type,
				body,
				publishDate,
				metadata
			},
			'copyright': pt::text(*[_type == 'site'][0].copyright)
		}`,
		{ tags: ['blog-rss'] },
	)

	if (!blog || !posts) {
		return new Response(
			'Missing either a blog page or blog posts in Sanity Studio',
			{ status: 500 },
		)
	}

	const url = processUrl(blog)

	const feed = new Feed({
		title: blog?.title || blog.metadata.title,
		description: blog.metadata.description,
		link: url,
		id: url,
		copyright,
		favicon: process.env.NEXT_PUBLIC_BASE_URL + 'favicon.ico',
		language: 'en',
		generator: 'https://sanitypress.dev',
	})

	posts.map((post) =>
		feed.addItem({
			title: escapeHTML(post.metadata.title),
			description: post.metadata.description,
			id: processUrl(post),
			link: processUrl(post),
			date: new Date(post.publishDate),
			content: toHTML(post.body, {
				components: {
					types: {
						image: ({ value }) => {
							const img = `<img src="${urlFor(value).url()}" alt="${value.alt}" />`
							const figcaption =
								value.caption && `<figcaption>${value.caption}</figcaption>`
							const source =
								value.source && `<a href="${value.source}">(Source)</a>`

							return `<figure>${[img, figcaption, source].filter(Boolean).join(' ')}</figure>`
						},
						code: ({ value }) =>
							`<pre><code>${escapeHTML(value.code)}</code></pre>`,
					},
				},
			}),
			image: post.image,
		}),
	)

	return new Response(feed.atom1(), {
		headers: {
			'Content-Type': 'application/atom+xml',
		},
	})
}
