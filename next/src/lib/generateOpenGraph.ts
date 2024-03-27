import getSite from './getSite'
import { BASE_URL } from '@/lib/env'
import type { Metadata } from 'next'

export default async function generateOpenGraph({
	metadata,
}: Sanity.Page): Promise<Metadata> {
	const { title, ogimage } = await getSite()
	const slug = metadata.slug.current

	return {
		openGraph: {
			type: 'website',
			url: [BASE_URL, slug !== 'index' && slug].filter(Boolean).join('/'),
			siteName: title,
			title: metadata.title,
			description: metadata.description,
			// images: [ogimage],
		},
	}
}
