import RSS from 'rss'
import { BASE_URL } from '@/lib/env'
import { fetchSanity } from '@/lib/sanity'
import groq from 'groq'

export async function GET() {
	const { blog, posts } = await fetchSanity<{
		blog: Sanity.Page
		posts: Sanity.BlogPost[]
	}>(
		groq`{
			'blog': *[_type == 'page' && metadata.slug.current == "blog"][0]{
				title,
				metadata
			},
			'posts': *[_type == 'blog.post']{
				title,
				publishDate,
				metadata
			}
		}`,
		{ tags: ['blog-rss'] }
	)

	const url = `${BASE_URL}/${blog.metadata.slug.current}`

	const feed = new RSS({
		title: `${blog.title}`,
		site_url: url,
		feed_url: `${url}/rss.xml`,
		language: 'en',
	})

	posts.map(post => feed.item({
		title: post.title,
		url: `${url}/${post.metadata.slug.current}`,
		date: post.publishDate,
		description: post.metadata.description,
	}))

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Content-Type': 'application/atom+xml'
		}
	})
}
