import type { SanityDocument, SanityImageAssetDocument } from 'next-sanity'

declare global {
	namespace Sanity {
		// documents

		type Site = SanityDocument & {
			title: string
			ogimage?: string
		}

		type Header = SanityDocument & {
			menu?: (Link | LinkList)[]
			ctas?: CTA[]
		}

		type Footer = SanityDocument & {
			menu?: (Link | LinkList)[]
		}

		type Page = SanityDocument & {
			readonly _type: 'page'
			title: string
			modules?: Module[]
			metadata: Metadata
		}

		type BlogPost = SanityDocument & {
			readonly _type: 'blog.post'
			title: string
			body: any
			readTime: number
			headings?: { style: string; text: string }[]
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
			params?: string
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
			image?: Image
			ogimage?: string
			noIndex: boolean
		}

		type Module<T = {}> = {
			_type: string
			_key: string
		} & T
	}
}

export {}
