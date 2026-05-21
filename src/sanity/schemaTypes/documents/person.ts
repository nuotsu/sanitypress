import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

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
			name: 'image',
			type: 'image',
			options: {
				hotspot: true,
			},
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
