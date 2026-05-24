'use server'

// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from 'next-sanity/live'
import { draftMode } from 'next/headers'
import { dev } from '@/lib/env'
import { apiVersion } from '@/sanity/env'
import { client } from './client'
import { token } from './token'

export const { sanityFetch, SanityLive } = defineLive({
	client: client.withConfig({ apiVersion }),
	serverToken: token,
	browserToken: token,
})

export async function sanityFetchLive<T>(
	args: Parameters<typeof sanityFetch>[0],
) {
	const preview = dev || (await draftMode()).isEnabled

	const { data } = await sanityFetch({
		perspective: preview ? 'drafts' : 'published',
		...args,
	})

	return data as T
}
