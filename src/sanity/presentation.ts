'use client'

import { defineLocations, presentationTool } from 'sanity/presentation'
import { groq } from 'next-sanity'
import { BLOG_DIR } from '@/lib/env'

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
				route: `/${BLOG_DIR}/:slug`,
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
					metaTitle: 'metadata.title',
					slug: 'metadata.slug.current',
				},
				resolve: (doc) => ({
					locations: [
						{
							title: doc?.title || doc?.metaTitle || 'Untitled',
							href: doc?.slug
								? doc.slug === 'index'
									? '/'
									: `/${doc.slug}`
								: '/',
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
							href: doc?.slug ? `/${BLOG_DIR}/${doc.slug}` : `/${BLOG_DIR}`,
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
							href: doc?.slug
								? `/${BLOG_DIR}?category=${doc.slug}`
								: `/${BLOG_DIR}`,
						},
					],
				}),
			}),
		},
	},
})
