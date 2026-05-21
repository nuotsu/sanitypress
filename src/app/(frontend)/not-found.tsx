import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { draftMode } from 'next/headers'
import { sanityFetch, sanityFetchMetadata } from '@/sanity/lib/live'
import { MODULES_QUERY } from '@/sanity/lib/queries'
import type { NOT_FOUND_QUERY_RESULT } from '@/sanity/types'
import ModulesResolver from '@/ui/modules'

export default async function NotFound() {
	return <CachedPage />
}

async function CachedPage() {
	'use cache'
	const { isEnabled: isDraftMode } = await draftMode()
	const { data: page } = (await sanityFetch({
		query: NOT_FOUND_QUERY,
		perspective: isDraftMode ? 'drafts' : 'published',
		stega: isDraftMode,
	})) as { data: NOT_FOUND_QUERY_RESULT }
	return <ModulesResolver page={page} />
}

export async function generateMetadata(): Promise<Metadata> {
	const { isEnabled: isDraftMode } = await draftMode()
	const { data: page } = (await sanityFetchMetadata({
		query: NOT_FOUND_QUERY,
		perspective: isDraftMode ? 'drafts' : 'published',
	})) as { data: NOT_FOUND_QUERY_RESULT }

	return {
		title: page?.metadata?.title,
		description: page?.metadata?.description,
		openGraph: {
			title: page?.metadata?.title,
			description: page?.metadata?.description,
		},
		robots: {
			index: page?.metadata?.noIndex ? false : undefined,
		},
	}
}

const NOT_FOUND_QUERY = groq`
	*[_type == 'page' && metadata.slug.current == '404'][0]{
		...,
		modules[]{ ${MODULES_QUERY} }
	}
`
