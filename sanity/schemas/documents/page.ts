import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	groups: [
		{ name: 'content', default: true },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'modules',
			type: 'array',
			of: [
				{ type: 'accordion-list' },
				{ type: 'blog-list' },
				{ type: 'breadcrumbs' },
				{ type: 'callout' },
				{ type: 'creative-module' },
				{ type: 'custom-html' },
				{ type: 'flag-list' },
				{ type: 'hero' },
				{ type: 'hero.saas' },
				{ type: 'hero.split' },
				{ type: 'logo-list' },
				{ type: 'pricing-list' },
				{ type: 'richtext-module' },
				{ type: 'stat-list' },
				{ type: 'step-list' },
				{ type: 'testimonial-list' },
				{ type: 'testimonial.featured' },
			],
			group: 'content',
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
			group: 'seo',
		}),
	],
	preview: {
		select: {
			title: 'title',
			slug: 'metadata.slug.current',
		},
		prepare: ({ title, slug }) => ({
			title,
			subtitle: slug && (slug === 'index' ? '/' : `/${slug}`),
		}),
	},
})
