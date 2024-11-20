import { fetchSanity, groq } from '@/sanity/lib/fetch'
import processUrl from '@/lib/processUrl'
import { Feed } from 'feed'
import { escapeHTML, toHTML } from '@portabletext/to-html'
import { urlFor } from '@/sanity/lib/image'

export async function GET() {
	const { blog, posts, copyright } = await fetchSanity<{
		blog: Sanity.Page
		posts: Array<Sanity.BlogPost & { image?: string }>
		copyright: string
	}>({
		query: groq`{
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
				authors[]->,
				metadata,
				'image': metadata.image.asset->url
			},
			'copyright': pt::text(*[_type == 'site'][0].copyright)
		}`,
	})

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
		favicon: process.env.NEXT_PUBLIC_BASE_URL + '/favicon.ico',
		language: 'en',
		generator: 'https://sanitypress.dev',
	})

	posts.map((post) =>
		feed.addItem({
			title: escapeHTML(post.metadata.title),
			description: post.metadata.description,
			id: processUrl(post),
			link: processUrl(post),
			published: new Date(post.publishDate),
			date: new Date(post.publishDate),
			author: post.authors?.map((author) => ({ name: author.name })),
			content: toHTML(post.body, {
				components: {
					types: {
						image: ({ value: { alt, caption, source, ...value } }) => {
							const img = `<img src="${urlFor(value).url()}" alt="${alt}" />`
							const figcaption =
								caption && `<figcaption>${caption}</figcaption>`
							const aSource = source && `<a href="${source}">(Source)</a>`

							return `<figure>${[img, figcaption, aSource].filter(Boolean).join(' ')}</figure>`
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
