import resolveUrl from './resolveUrl'
import { BASE_URL, BLOG_DIR, vercelPreview } from './env'
import type { Metadata } from 'next'
import { DEFAULT_LANG } from './i18n'

export default async function processMetadata(
	page: Sanity.PageBase & {
		translations?: {
			slug: string
			language?: string
		}[]
	},
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
				page.translations
					?.filter((t) => !!t?.language && !!t?.slug)
					?.map(({ language, slug }) => [
						language,
						[BASE_URL, language !== DEFAULT_LANG && language, slug]
							.filter(Boolean)
							.join('/'),
					]) || [],
			),
			types: {
				'application/rss+xml': `/${BLOG_DIR}/rss.xml`,
			},
		},
	}
}
