import type { SanityDocument, SanityImageAssetDocument } from 'next-sanity'

declare global {
	namespace Sanity {
		// documents

		type Page = SanityDocument & {
			title: string
			modules?: Module[]
			metadata: Metadata
		}

		// objects

		type CTA = {
			link?: Link
			style: string
		}

		type Image = SanityImageAssetDocument & {
			alt?: string
		}

		type Link = {
			label: string
			type: 'internal' | 'external'
			internal?: Page
			external?: string
		}

		type Metadata = {
			title: string
			description: string
			slug: { current: string }
		}

		type Module = {
			_type: string
			_key: string
		}
	}
}

export {}
