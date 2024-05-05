import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'site',
	title: 'Site',
	type: 'document',
	fieldsets: [
		{ name: 'navigation', title: 'Navigation', options: { columns: 2 } },
	],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		}),
		defineField({
			name: 'headerMenu',
			type: 'reference',
			to: [{ type: 'navigation' }],
			fieldset: 'navigation',
		}),
		defineField({
			name: 'footerMenu',
			type: 'reference',
			to: [{ type: 'navigation' }],
			fieldset: 'navigation',
		}),
		defineField({
			name: 'social',
			type: 'reference',
			to: [{ type: 'navigation' }],
			fieldset: 'navigation',
		}),
		defineField({
			name: 'ogimage',
			title: 'Open Graph Image (global)',
			description: 'Used for social sharing previews',
			type: 'image',
		}),
	],
})
