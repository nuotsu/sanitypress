import type { MetadataRoute } from 'next'
import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import { getDynamicFetchOptions, sanityFetchMetadata } from '@/sanity/lib/live'
import type { SITEMAP_QUERY_RESULT } from '@/sanity/types'

export default async function (): Promise<MetadataRoute.Sitemap> {
	const { perspective } = await getDynamicFetchOptions()
	const { data } = await sanityFetchMetadata({
		query: SITEMAP_QUERY,
		params: {
			baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
			blogDir: ROUTES.blog,
		},
		perspective,
	})

	return Object.values(
		data as SITEMAP_QUERY_RESULT,
	).flat() as MetadataRoute.Sitemap
}

const SITEMAP_QUERY = groq`{
	'pages': *[
		_type == 'page'
		&& defined(metadata.slug.current)
		&& !(metadata.slug.current in ['404'])
		&& metadata.noIndex != true
	]|order(metadata.slug.current != 'index', metadata.slug.current){
		'url': $baseUrl + select(
			metadata.slug.current == 'index' => '',
			'/' + metadata.slug.current
		),
		'lastModified': _updatedAt,
		'priority': select(
			metadata.slug.current == 'index' => 1,
			0.5
		)
	},
	'posts': *[
		_type == 'blog.post'
		&& defined(metadata.slug.current)
		&& metadata.noIndex != true
	]|order(publishDate desc){
		'url': $baseUrl + '/' + $blogDir + '/' + metadata.slug.current,
		'lastModified': _updatedAt,
		'priority': 0.4
	}
}`
