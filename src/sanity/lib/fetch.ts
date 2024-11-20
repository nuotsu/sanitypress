import client from '@/sanity/client'
import { token } from '@/sanity/lib/token'
import { dev } from '@/lib/env'
import { draftMode } from 'next/headers'
import { defineLive } from 'next-sanity'

export { groq } from 'next-sanity'

export const { sanityFetch, SanityLive } = defineLive({
	client,
	serverToken: token,
	browserToken: token,
	fetchOptions: {
		revalidate: dev ? 0 : 3600, // every hour
	},
})

export async function fetchSanity<T = any>(
	args: Parameters<typeof sanityFetch>[0],
) {
	const preview = dev || (await draftMode()).isEnabled

	const { data } = await sanityFetch({
		...args,
		perspective: preview ? 'previewDrafts' : 'published',
	})

	return data as T
}
