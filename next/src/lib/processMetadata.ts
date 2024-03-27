import type { Metadata } from 'next'
import getSite from './getSite'
import { BASE_URL } from './env'

export default async function processMetadata(
	{ title, description, slug }: Sanity.Metadata,
	directory?: string,
): Promise<Metadata> {
	const { ogimage } = await getSite()

	return {
		metadataBase: new URL(BASE_URL),
		title,
		description,
		openGraph: {
			type: 'website',
			url: [directory, slug.current === 'index' ? '/' : slug.current]
				.filter(Boolean)
				.join('/'),
			title,
			description,
			images: ogimage && [{ url: ogimage }],
		},
	}
}
