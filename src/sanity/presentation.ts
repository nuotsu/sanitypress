import {
	defineDocuments,
	defineLocations,
	presentationTool,
} from 'sanity/presentation'
import { groq } from 'next-sanity'
import { ROUTES } from '@/lib/env'
import {
	locationResolvers,
	referenceLocations,
} from './presentation/reference-locations'

export default presentationTool({
	previewUrl: {
		previewMode: {
			enable: '/api/draft-mode/enable',
			disable: '/api/draft-mode/disable',
		},
	},
	resolve: {
		mainDocuments: defineDocuments([
			{
				route: '/',
				filter: groq`_type == 'page' && metadata.slug.current == $slug`,
				params: { slug: 'index' },
			},
			{
				route: '/:slug',
				filter: groq`_type == 'page' && metadata.slug.current == $slug`,
			},
			{
				route: `/${ROUTES.blog}/:slug`,
				filter: groq`_type == 'blog.post' && metadata.slug.current == $slug`,
			},
		]),
		locations: locationResolvers({
			// global
			site: defineLocations({
				message: 'Global settings used on all pages',
				tone: 'positive',
			}),
			'global-module': defineLocations({
				message: 'Modules are added to all pages in the target path',
				tone: 'positive',
			}),
			// Used on...
			page: defineLocations({
				select: { title: 'title', slug: 'metadata.slug.current' },
				resolve: (doc) => ({
					locations: [
						{
							title: doc?.title,
							href: !doc?.slug || doc.slug === 'index' ? '/' : `/${doc.slug}`,
						},
					],
				}),
			}),
			'blog.post': defineLocations({
				select: { title: 'metadata.title', slug: 'metadata.slug.current' },
				resolve: (doc) => ({
					locations: [
						{
							title: doc?.title,
							href: doc?.slug
								? `/${ROUTES.blog}/${doc.slug}`
								: `/${ROUTES.blog}`,
						},
					],
				}),
			}),
			form: referenceLocations('form'),
			quote: referenceLocations('quote'),
			logo: referenceLocations('logo'),
			person: referenceLocations('person'),
		}),
	},
})
