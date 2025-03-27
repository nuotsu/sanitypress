import { defineField } from 'sanity'

export default defineField({
	name: 'modules',
	description: 'Page content',
	type: 'array',
	of: [
		{ type: 'accordion-list' },
		{ type: 'blog-frontpage' },
		{ type: 'blog-list' },
		{ type: 'blog-post-content' },
		{ type: 'breadcrumbs' },
		{ type: 'callout' },
		{ type: 'card-list' },
		{ type: 'creative-module' },
		{ type: 'custom-html' },
		{ type: 'flag-list' },
		{ type: 'hero' },
		{ type: 'hero.saas' },
		{ type: 'hero.split' },
		{ type: 'logo-list' },
		{ type: 'person-list' },
		{ type: 'pricing-list' },
		{ type: 'richtext-module' },
		{ type: 'schedule-module' },
		{ type: 'search-module' },
		{ type: 'stat-list' },
		{ type: 'step-list' },
		{ type: 'tabbed-content' },
		{ type: 'testimonial-list' },
		{ type: 'testimonial.featured' },
	],
	options: {
		insertMenu: {
			views: [
				{
					name: 'grid',
					previewImageUrl: (schemaType) =>
						`/admin/thumbnails/${schemaType}.webp`,
				},
				{ name: 'list' },
			],
			groups: [
				{
					name: 'blog',
					of: ['blog-frontpage', 'blog-list', 'blog-post-content'],
				},
				{ name: 'hero', of: ['hero', 'hero.saas', 'hero.split'] },
				{
					name: 'lists',
					of: [
						'accordion-list',
						'blog-list',
						'card-list',
						'flag-list',
						'logo-list',
						'person-list',
						'pricing-list',
						'stat-list',
						'step-list',
						'testimonial-list',
					],
				},
				{
					name: 'testimonials',
					of: ['testimonial-list', 'testimonial.featured'],
				},
			],
		},
	},
})
