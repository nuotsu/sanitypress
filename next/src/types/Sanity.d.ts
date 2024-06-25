import type { SanityImageObject } from '@sanity/image-url/lib/types/types'
import type { SanityDocument } from 'next-sanity'

declare global {
	namespace Sanity {
		// documents

		type Site = SanityDocument<{
			title: string
			logo?: Logo
			announcements?: Announcement[]
			ctas?: CTA[]
			copyright?: any
			headerMenu?: Navigation
			footerMenu?: Navigation
			social?: Navigation
			ogimage?: string
		}>

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

		// pages

		type PageBase = SanityDocument<{
			title?: string
			metadata: Metadata
		}>

		type Page = PageBase & {
			readonly _type: 'page'
			modules?: Module[]
		}

		type BlogPost = PageBase & {
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

		// miscellaneous

		type Logo = SanityDocument<{
			name: string
			image?: Partial<{
				default: Image
				light: Image
				dark: Image
			}>
		}>

		type Pricing = SanityDocument<{
			title: string
			highlight?: string
			price: {
				base: number
				strikethrough?: number
				suffix?: string
			}
			ctas?: CTA[]
			content?: any
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
			link: Link
			links?: Link[]
		}

		type Metadata = {
			slug: { current: string }
			title: string
			description: string
			image?: Image
			ogimage?: string
			noIndex: boolean
		}

		type Module<T = string> = {
			_type: T
			_key: string
			uid?: string
		}
	}
}

export {}
