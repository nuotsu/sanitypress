import { defineField, defineType } from 'sanity'
import { ComponentIcon } from '@sanity/icons/Component'

export default defineType({
	name: 'logo',
	title: 'Logo',
	type: 'document',
	icon: ComponentIcon,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'image',
			type: 'object',
			options: {
				columns: 3,
			},
			fields: [
				defineField({
					name: 'default',
					type: 'image',
					options: {
						hotspot: true,
					},
				}),
				defineField({
					name: 'light',
					description: 'On dark backgrounds',
					type: 'image',
					options: {
						hotspot: true,
					},
				}),
				defineField({
					name: 'dark',
					description: 'On light backgrounds',
					type: 'image',
					options: {
						hotspot: true,
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			title: 'title',
			media: 'image.default',
		},
	},
})
