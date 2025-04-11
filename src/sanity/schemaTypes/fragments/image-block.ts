import { defineArrayMember, defineField } from 'sanity'
import { IoIosImage } from 'react-icons/io'

export default defineArrayMember({
	type: 'image',
	icon: IoIosImage,
	options: {
		hotspot: true,
		metadata: ['lqip'],
	},
	fieldsets: [
		{ name: 'attributes', options: { columns: 2 } },
		{ name: 'options' },
	],
	fields: [
		defineField({
			name: 'alt',
			type: 'string',
			fieldset: 'attributes',
		}),
		defineField({
			name: 'loading',
			type: 'string',
			options: {
				list: ['lazy', 'eager'],
				layout: 'radio',
			},
			initialValue: 'lazy',
			fieldset: 'attributes',
		}),
		defineField({
			name: 'caption',
			type: 'text',
			rows: 2,
			fieldset: 'options',
		}),
		defineField({
			name: 'source',
			type: 'url',
			fieldset: 'options',
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
