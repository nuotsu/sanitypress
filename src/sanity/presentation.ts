'use client'

import { presentationTool } from 'sanity/presentation'
import { groq } from 'next-sanity'

export const presentation = presentationTool({
	name: 'editor',
	title: 'Editor',
	previewUrl: {
		previewMode: {
			enable: '/api/draft-mode/enable',
		},
	},
	resolve: {
		mainDocuments: [
			{
				route: '/',
				filter: groq`_type == 'page' && metadata.slug.current == 'index'`,
			},
			{
				route: '/:slug',
				filter: groq`_type == 'page' && metadata.slug.current == $slug`,
			},
			{
				route: '/blog/:slug',
				filter: groq`_type == 'blog.post' && metadata.slug.current == $slug`,
			},
		],
	},
})
