import client from '@/sanity/client'
import { token } from '@/sanity/lib/token'
import { dev } from '@/lib/env'
import { draftMode } from 'next/headers'
import { defineLive, type QueryParams, type QueryOptions } from 'next-sanity'

export { groq } from 'next-sanity'

const REVALIDATE_TIME = 3600 // every hour

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
						revalidate: REVALIDATE_TIME,
						...next,
					},
				},
	)
}

export const { sanityFetch, SanityLive } = defineLive({
	client,
	serverToken: token,
	browserToken: token,
	fetchOptions: {
		revalidate: dev ? 0 : REVALIDATE_TIME,
	},
})

export async function fetchSanityLive<T = any>(
	args: Parameters<typeof sanityFetch>[0],
) {
	const preview = dev || (await draftMode()).isEnabled

	const { data } = await sanityFetch({
		...args,
		perspective: preview ? 'previewDrafts' : 'published',
	})

	return data as T
}
