import { groq, sanityFetch } from '@/lib/sanity/fetch'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const { data } = await sanityFetch({
		query: groq`{
			'pages': *[
				_type == 'page' &&
				!(metadata.slug.current in ['404', 'blog/*']) &&
				metadata.noIndex != true
			]|order(metadata.slug.current){
				'url': $baseUrl + select(metadata.slug.current == 'index' => '', metadata.slug.current),
				'lastModified': _updatedAt,
				'priority': select(
					metadata.slug.current == 'index' => 1,
					0.5
				),
			},
			'posts': *[_type == 'blog.post' && metadata.noIndex != true]|order(name){
				'url': $baseUrl + 'blog/' + metadata.slug.current,
				'lastModified': _updatedAt,
				'priority': 0.4
			}
		}`,
		params: {
			baseUrl: process.env.NEXT_PUBLIC_BASE_URL + '/',
		},
	})

	return Object.values(data as Record<string, MetadataRoute.Sitemap>).flat()
}
