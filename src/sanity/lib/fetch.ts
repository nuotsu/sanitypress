import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'
import { dev } from '@/lib/env'
import { draftMode } from 'next/headers'
import { defineLive, type QueryOptions } from 'next-sanity'
import type { QueryParams } from 'sanity'

export { groq } from 'next-sanity'

export async function fetchSanity<T = any>({
	query,
	params = {},
	next,
}: {
	query: string
	params?: Partial<QueryParams>
	next?: QueryOptions['next']
}) {
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
