import { defineArrayMember, defineField } from 'sanity'
import { IoIosImage } from 'react-icons/io'

export default defineArrayMember({
	type: 'image',
	icon: IoIosImage,
	options: {
		hotspot: true,
	},
	fields: [
		defineField({
			name: 'caption',
			type: 'text',
			rows: 2,
		}),
		defineField({
			name: 'alt',
			type: 'string',
		}),
		defineField({
			name: 'source',
			type: 'url',
		}),
		defineField({
			name: 'loading',
			type: 'string',
			options: {
				list: ['lazy', 'eager'],
			},
			initialValue: 'lazy',
		}),
	],
	preview: {
		select: {
			title: 'caption',
			subtitle: 'alt',
			media: 'asset',
		},
	},
})
