import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons/User'

export default defineType({
	name: 'person',
	title: 'Person',
	type: 'document',
	icon: UserIcon,
	fields: [
		defineField({
			name: 'name',
			type: 'string',
		}),
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'image',
			type: 'image',
			options: {
				hotspot: true,
				metadata: ['lqip'],
			},
		}),
		defineField({
			name: 'enableSchema',
			title: 'Enable Person schema.org markup',
			type: 'boolean',
			initialValue: false,
		}),
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'title',
			media: 'image',
		},
	},
})
