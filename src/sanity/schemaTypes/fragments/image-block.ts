import { defineArrayMember, defineField } from 'sanity'
import { IoIosImage } from 'react-icons/io'

export default defineArrayMember({
	type: 'image',
	icon: IoIosImage,
	options: {
		hotspot: true,
	},
	fieldsets: [
		{ name: 'info', options: { collapsible: true, collapsed: true } },
		{ name: 'options', options: { collapsible: true, collapsed: true } },
	],
	fields: [
		defineField({
			name: 'caption',
			type: 'text',
			rows: 2,
			fieldset: 'info',
		}),
		defineField({
			name: 'alt',
			type: 'string',
			fieldset: 'info',
		}),
		defineField({
			name: 'source',
			type: 'url',
			fieldset: 'info',
		}),
		defineField({
			name: 'loading',
			type: 'string',
			options: {
				list: ['lazy', 'eager'],
				layout: 'radio',
			},
			initialValue: 'lazy',
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
