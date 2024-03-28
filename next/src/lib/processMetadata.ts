import type { Metadata } from 'next'
import getSite from './getSite'
import { BASE_URL } from './env'

export default async function processMetadata({
	metadata,
	noIndex,
}: Sanity.Page | Sanity.BlogPost): Promise<Metadata> {
	const { ogimage } = await getSite()
	const { title, description, slug } = metadata

	return {
		metadataBase: new URL(BASE_URL),
		title,
		description,
		openGraph: {
			type: 'website',
			url: [slug.current === 'index' ? '/' : slug.current]
				.filter(Boolean)
				.join('/'),
			title,
			description,
			images: ogimage && [ogimage],
		},
		robots: {
			index: !noIndex,
		},
	}
}
