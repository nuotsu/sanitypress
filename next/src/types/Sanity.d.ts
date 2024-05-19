import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import type { SanityDocument } from 'next-sanity'

declare global {
	namespace Sanity {
		// documents

		type Site = SanityDocument<{
			title: string
			logo: Logo
			announcements?: Announcement[]
			copyright?: any
			ctas?: CTA[]
			headerMenu?: Navigation
			footerMenu?: Navigation
			social?: Navigation
			ogimage?: string
		}>

		type PageBase = SanityDocument<{
			title?: string
			metadata: Metadata
		}>

		type Page = PageBase & {
			readonly _type: 'page'
			modules?: Module[]
		}

		type Navigation = SanityDocument<{
			title: string
			items?: (Link | LinkList)[]
		}>

		type Announcement = SanityDocument<{
			content: any
			cta?: Link
			start?: string
			end?: string
		}>

		type BlogPost = Omit<PageBase, 'title'> & {
			readonly _type: 'blog.post'
			body: any
			readTime: number
			headings?: { style: string; text: string }[]
			categories: BlogCategory[]
			publishDate: string
		}

		type BlogCategory = SanityDocument<{
			title: string
		}>

		type Logo = SanityDocument<{
			name: string
			image: {
				default?: Image
				light?: Image
				dark?: Image
			}
		}>

		type Testimonial = SanityDocument<{
			content: any
			author?: {
				name: string
				title?: string
				image?: Image
			}
		}>

		// objects

		type CTA = {
			link?: Link
			style?: string
		}

		type Image = SanityImageObject &
			Partial<{
				alt: string
				loading: 'lazy' | 'eager'
			}>

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

		type Module<T = any> = {
			_type: T
			_key: string
		} & T
	}
}

export {}
