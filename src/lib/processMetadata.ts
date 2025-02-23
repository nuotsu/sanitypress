import resolveUrl from './resolveUrl'
import { BASE_URL, vercelPreview } from './env'
import type { Metadata } from 'next'
import { DEFAULT_LANG } from './i18n'

export default async function processMetadata(
	page: Sanity.Page | Sanity.BlogPost,
): Promise<Metadata> {
	const url = resolveUrl(page)
	const { title, description, ogimage, noIndex } = page.metadata

	return {
		metadataBase: new URL(BASE_URL),
		title,
		description,
		openGraph: {
			type: 'website',
			url,
			title,
			description,
			images:
				ogimage || `${BASE_URL}/api/og?title=${encodeURIComponent(title)}`,
		},
		robots: {
			index: noIndex || vercelPreview ? false : undefined,
		},
		alternates: {
			canonical: url,
			languages: Object.fromEntries(
				page.translations?.map((t) => [
					t?.language,
					[BASE_URL, t?.language !== DEFAULT_LANG && t?.language, t?.slug]
						.filter(Boolean)
						.join('/'),
				]) || [],
			),
			types: {
				'application/rss+xml': '/blog/rss.xml',
			},
		},
	}
}
