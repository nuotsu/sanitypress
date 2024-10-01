import { defineField, defineType } from 'sanity'
import { VscVerified } from 'react-icons/vsc'

export default defineType({
	name: 'logo',
	title: 'Logo',
	icon: VscVerified,
	type: 'document',
	fields: [
		defineField({
			name: 'name',
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
			title: 'name',
			media: 'image.default',
		},
		prepare: ({ title, media }) => ({
			title,
			subtitle: 'Logo',
			media,
		}),
	},
})
