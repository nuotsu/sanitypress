import type { Metadata } from 'next'
import { groq } from 'next-sanity'
import { sanityFetchLive } from '@/sanity/lib/live'
import { MODULES_QUERY } from '@/sanity/lib/queries'
import type { NOT_FOUND_QUERY_RESULT } from '@/sanity/types'
import ModulesResolver from '@/ui/modules'

export default async function () {
	const page = await getPage()
	return <ModulesResolver page={page} />
}

export async function generateMetadata(): Promise<Metadata> {
	const page = await getPage()

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

async function getPage() {
	return await sanityFetchLive<NOT_FOUND_QUERY_RESULT>({
		query: NOT_FOUND_QUERY,
	})
}

const NOT_FOUND_QUERY = groq`
	*[_type == 'page' && metadata.slug.current == '404'][0]{
		...,
		modules[]{ ${MODULES_QUERY} }
	}
`
