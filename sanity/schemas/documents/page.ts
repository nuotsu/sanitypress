import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	fieldsets: [
		{
			name: 'settings',
			title: 'Settings',
			options: { columns: 2, collapsible: true, collapsed: true },
		},
	],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'noIndex',
			type: 'boolean',
			initialValue: false,
			fieldset: 'settings',
		}),
		defineField({
			name: 'modules',
			type: 'array',
			of: [
				{ type: 'blog-rollup' },
				{ type: 'faq-list' },
				{ type: 'hero.centered' },
				{ type: 'hero.postcard' },
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
		},
		prepare: ({ title, slug }) => ({
			title,
			subtitle: slug && (slug === 'index' ? '/' : `/${slug}`),
		}),
	},
})
