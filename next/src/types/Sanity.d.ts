import type { SanityDocument, SanityImageAssetDocument } from 'next-sanity'

declare global {
	namespace Sanity {
		// documents

		type Site = SanityDocument & {
			title: string
			menu: (Link | LinkList)[]
		}

		type Page = SanityDocument & {
			title: string
			modules?: Module[]
			metadata: Metadata
		}

		type BlogPost = SanityDocument & {
			title: string
			body: any
			categories: BlogCategory[]
			publishDate: string
			metadata: Metadata
		}

		type BlogCategory = SanityDocument & {
			title: string
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

		type LinkList = {
			label: string
			links: Link[]
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
