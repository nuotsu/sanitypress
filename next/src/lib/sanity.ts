import {
	createClient,
	type QueryParams,
	type ResponseQueryOptions,
} from 'next-sanity'
import dev from '@/lib/env'
import groq from 'groq'

export { default as groq } from 'groq'

export const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: 'production',
	apiVersion: '2024-04-01',
	useCdn: !dev,
})

export function fetchSanity<T = any>(
	query: string,
	{
		params = {},
		...next
	}: { params?: QueryParams } & ResponseQueryOptions['next'] = {},
) {
	return client.fetch<T>(query, params, {
		...(dev
			? {
					token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
					perspective: 'previewDrafts',
				}
			: {
					perspective: 'published',
				}),
		next: {
			revalidate: dev ? 0 : false,
			...next,
		},
	})
}

/* queries */

export async function getSite() {
	return await fetchSanity<Sanity.Site>(
		groq`
			*[_type == 'site'][0]{
				...,
				'ogimage': ogimage.asset->url
			}
		`,
		{ tags: ['site'] },
	)
}

export async function getHeader() {
	return await fetchSanity<Sanity.Header>(
		groq`*[_type == 'header'][0]{
			menu[]{
				...,
				internal->{ _type, title, metadata },
				links[]{
					...,
					internal->{ _type, title, metadata }
				}
			},
			ctas[]{
				...,
				link{
					...,
					internal->{ _type, title, metadata }
				}
			}
		}`,
		{ tags: ['header'] },
	)
}

export async function getFooter() {
	return await fetchSanity<Sanity.Footer>(
		groq`*[_type == 'header'][0]{
			menu[]{
				...,
				internal->{ _type, title, metadata },
				links[]{
					...,
					internal->{ _type, title, metadata }
				}
			}
		}`,
		{ tags: ['footer'] },
	)
}
