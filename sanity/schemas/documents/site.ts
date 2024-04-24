import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'site',
	title: 'Site',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'ogimage',
			title: 'Open Graph Image',
			description: 'Used for social sharing previews',
			type: 'image',
		}),
	],
})
