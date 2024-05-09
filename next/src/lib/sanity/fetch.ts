import client from '@/lib/sanity/client'
import dev from '@/lib/env'
import { draftMode } from 'next/headers'
import type { QueryParams, ResponseQueryOptions } from 'next-sanity'

export { default as groq } from 'groq'

export function fetchSanity<T = any>(
	query: string,
	{
		params = {},
		preview = dev || draftMode().isEnabled,
		...next
	}: {
		params?: QueryParams
		preview?: boolean
	} & ResponseQueryOptions['next'] = {},
) {
	return client.fetch<T>(
		query,
		params,
		preview
			? {
					stega: true,
					perspective: 'previewDrafts',
					token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
					useCdn: false,
					next: {
						revalidate: 0,
						...next,
					},
				}
			: {
					perspective: 'published',
					useCdn: true,
					next: {
						revalidate: false,
						...next,
					},
				},
	)
}
