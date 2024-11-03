'use client'

import {
	defineLocations,
	type PresentationPluginOptions,
} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
	locations: {
		page: defineLocations({
			select: {
				metadata: 'metadata',
			},
			resolve: (doc) => {
				const slug = doc?.metadata?.slug?.current

				return {
					locations: [
						{
							title: doc?.metadata?.title,
							href: slug === 'index' ? '/' : `/${slug}`,
						},
					],
				}
			},
		}),

		'blog.post': defineLocations({
			select: {
				metadata: 'metadata',
			},
			resolve: (doc) => ({
				locations: [
					{
						title: doc?.metadata?.title,
						href: `/blog/${doc?.metadata?.slug?.current}`,
					},
				],
			}),
		}),
	},
}
