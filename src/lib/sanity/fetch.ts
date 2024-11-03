import client from '@/lib/sanity/client'
import { token } from '@/lib/sanity/token'
import { dev } from '@/lib/env'
import { draftMode } from 'next/headers'
import { type QueryParams, type QueryOptions, defineLive } from 'next-sanity'

export { groq } from 'next-sanity'

export async function fetchSanity<T = any>(
	query: string,
	{
		params = {},
		...next
	}: {
		params?: QueryParams
	} & QueryOptions['next'] = {},
) {
	const preview = dev || (await draftMode()).isEnabled

	return client.fetch<T>(
		query,
		params,
		preview
			? {
					stega: true,
					perspective: 'previewDrafts',
					useCdn: false,
					token,
					next: {
						revalidate: 0,
						...next,
					},
				}
			: {
					perspective: 'published',
					useCdn: true,
					next: {
						revalidate: 3600, // every hour
						...next,
					},
				},
	)
}

export const { sanityFetch, SanityLive } = defineLive({
	client,
	serverToken: token,
	browserToken: token,
})
