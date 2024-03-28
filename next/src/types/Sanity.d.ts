import type { SanityDocument, SanityImageAssetDocument } from 'next-sanity'

declare global {
	namespace Sanity {
		// documents

		type Site = SanityDocument & {
			title: string
			menu?: (Link | LinkList)[]
			ogimage?: string
		}

		type Page = SanityDocument & {
			readonly _type: 'page'
			title: string
			noIndex: boolean
			modules?: Module[]
			metadata: Metadata
		}

		type BlogPost = SanityDocument & {
			readonly _type: 'blog.post'
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
			style?: string
		}

		type Image = SanityImageAssetDocument & {
			alt?: string
		}

		type Link = {
			readonly _type: 'link'
			label: string
			type: 'internal' | 'external'
			internal?: Page | BlogPost
			external?: string
		}

		type LinkList = {
			readonly _type: 'link.list'
			label: string
			links?: Link[]
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
