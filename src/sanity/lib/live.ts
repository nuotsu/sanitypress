// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { type QueryParams } from 'next-sanity'
import {
	defineLive,
	resolvePerspectiveFromCookies,
	type LivePerspective,
} from 'next-sanity/live'
import { cookies, draftMode } from 'next/headers'
import { dev } from '@/lib/env'
import { apiVersion } from '@/sanity/env'
import { client } from './client'
import { token } from './token'

export const { sanityFetch, SanityLive } = defineLive({
	client: client.withConfig({ apiVersion }),
	serverToken: token,
	browserToken: token,
	strict: true,
})

export interface DynamicFetchOptions {
	perspective: LivePerspective
	stega: boolean
}

// Resolve dynamic values (perspective/stega) outside `'use cache'` boundaries,
// then pass them into cached components as plain props.
export async function getDynamicFetchOptions({
	allowDevPreview = true,
}: { allowDevPreview?: boolean } = {}): Promise<DynamicFetchOptions> {
	const { isEnabled: isDraftMode } = await draftMode()
	if (!isDraftMode) {
		if (allowDevPreview && dev) return { perspective: 'drafts', stega: false }
		return { perspective: 'published', stega: false }
	}

	const jar = await cookies()
	const perspective = await resolvePerspectiveFromCookies({ cookies: jar })
	return { perspective: perspective ?? 'drafts', stega: true }
}

// For usage within `generateStaticParams`
export async function sanityFetchStaticParams<
	const QueryString extends string,
>({ query, params = {} }: { query: QueryString; params?: QueryParams }) {
	'use cache'
	const { data } = await sanityFetch({
		query,
		params,
		perspective: 'published',
		stega: false,
	})
	return data
}

// For usage within `generateMetadata`, `generateViewport`, and file-based
// metadata routes (sitemap.ts, robots.ts, opengraph-image.tsx, etc.)
export async function sanityFetchMetadata<const QueryString extends string>({
	query,
	params = {},
	perspective,
}: {
	query: QueryString
	params?: QueryParams
	perspective: LivePerspective
}) {
	'use cache'
	const { data } = await sanityFetch({
		query,
		params,
		perspective,
		stega: false,
	})
	return data
}
