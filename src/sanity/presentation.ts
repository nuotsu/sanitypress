'use client'

import { defineLocations, presentationTool } from 'sanity/presentation'
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
				filter: groq`
					_type == 'page' &&
					array::join([...parent[]->metadata.slug.current, metadata.slug.current], '/') == $slug
				`,
			},
			{
				route: '/blog/:slug',
				filter: groq`_type == 'blog.post' && metadata.slug.current == $slug`,
			},
		],
		locations: {
			site: defineLocations({
				message: 'This document is used on all pages',
				locations: [
					{
						title: 'Home',
						href: '/',
					},
				],
			}),
			page: defineLocations({
				select: {
					title: 'title',
					parent1: 'parent.0.metadata.slug.current',
					parent2: 'parent.1.metadata.slug.current',
					parent3: 'parent.2.metadata.slug.current',
					metaTitle: 'metadata.title',
					slug: 'metadata.slug.current',
				},
				resolve: (doc) => ({
					locations: [
						{
							title: doc?.title || doc?.metaTitle || 'Untitled',
							href: [
								doc?.parent1 &&
									`/${[doc.parent1, doc.parent2, doc.parent3].filter(Boolean).join('/')}`,
								doc?.slug ? (doc.slug !== 'index' ? `/${doc.slug}` : '/') : '/',
							]
								.filter(Boolean)
								.join(''),
						},
					],
				}),
			}),
			'blog.post': defineLocations({
				select: {
					title: 'metadata.title',
					slug: 'metadata.slug.current',
				},
				resolve: (doc) => ({
					locations: [
						{
							title: doc?.title || 'Untitled',
							href: doc?.slug ? `/blog/${doc.slug}` : '/blog',
						},
					],
				}),
			}),
			'blog.category': defineLocations({
				select: {
					title: 'title',
					slug: 'slug.current',
				},
				resolve: (doc) => ({
					locations: [
						{
							title: doc?.title || 'Untitled',
							href: doc?.slug ? `/blog?category=${doc.slug}` : '/blog',
						},
					],
				}),
			}),
		},
	},
})
