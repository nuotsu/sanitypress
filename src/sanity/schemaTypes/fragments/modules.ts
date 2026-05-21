import { defineField } from 'sanity'

export default ({ of = [] }: { of?: Array<{ type: string }> } = {}) =>
	defineField({
		name: 'modules',
		type: 'array',
		of: [
			{ type: 'accordion-list' },
			{ type: 'blog-index' },
			{ type: 'blog-post-list' },
			{ type: 'breadcrumbs' },
			{ type: 'callout' },
			{ type: 'card-list' },
			{ type: 'custom-html' },
			{ type: 'form-module' },
			{ type: 'hero.split' },
			{ type: 'logo-list' },
			{ type: 'person-list' },
			{ type: 'prose' },
			{ type: 'quote-list' },
			{ type: 'search-module' },
			{ type: 'stat-list' },
			{ type: 'step-list' },
			...of,
		],
		options: {
			insertMenu: {
				filter: true,
				views: [
					{
						name: 'grid',
						previewImageUrl: (module) => `/module-thumbnails/${module}.png`,
					},
					{ name: 'list' },
				],
				groups: [
					{
						name: 'content',
						of: [
							'accordion-list',
							'callout',
							'card-list',
							'form-module',
							'hero.split',
							'logo-list',
							'person-list',
							'prose',
							'quote-list',
							'stat-list',
							'step-list',
						],
					},
					{
						name: 'utility',
						of: ['breadcrumbs', 'custom-html', 'form-module', 'search-module'],
					},
					{
						name: 'blog',
						of: ['blog-index', 'blog-post-content', 'blog-post-list'],
					},
				],
			},
		},
	})
