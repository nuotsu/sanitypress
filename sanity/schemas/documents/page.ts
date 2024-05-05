import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'modules',
			type: 'array',
			of: [
				{ type: 'blog-rollup' },
				{ type: 'creative-module' },
				{ type: 'custom-html' },
				{ type: 'faq-list' },
				{ type: 'hero.centered' },
				{ type: 'hero.postcard' },
				{ type: 'logo-list' },
				{ type: 'richtext-module' },
				{ type: 'stat-list' },
				{ type: 'testimonial-list' },
			],
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
		}),
	],
	preview: {
		select: {
			title: 'title',
			slug: 'metadata.slug.current',
			media: 'metadata.image',
		},
		prepare: ({ title, slug }) => ({
			title,
			subtitle: slug && (slug === 'index' ? '/' : `/${slug}`),
		}),
	},
})
