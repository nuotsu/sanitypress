import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '../../src/utils'

export default defineType({
	name: 'hero',
	title: 'Hero',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'options', title: 'Options' },
		{ name: 'image', title: 'Image' },
	],
	fieldsets: [
		{ name: 'image', title: 'Image', options: { columns: 2 } },
		{ name: 'alignment', title: 'Alignment', options: { columns: 2 } },
	],
	fields: [
		defineField({
			name: 'pretitle',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		}),
		defineField({
			name: 'textAlign',
			type: 'string',
			options: {
				layout: 'radio',
				list: ['left', 'center', 'right'],
			},
			initialValue: 'center',
			group: 'options',
			fieldset: 'alignment',
		}),
		defineField({
			name: 'alignItems',
			title: 'Vertical alignment',
			type: 'string',
			options: {
				layout: 'radio',
				list: [
					{ title: 'Top', value: 'start' },
					'center',
					{ title: 'Bottom', value: 'end' },
				],
			},
			initialValue: 'center',
			group: 'options',
			fieldset: 'alignment',
		}),
		defineField({
			name: 'bgImage',
			title: 'Background image',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: 'alt',
					type: 'string',
				}),
				defineField({
					name: 'loading',
					type: 'string',
					options: {
						layout: 'radio',
						list: ['lazy', 'eager'],
					},
					initialValue: 'lazy',
				}),
			],
			fieldset: 'image',
			group: 'image',
		}),
		defineField({
			name: 'bgImageMobile',
			title: 'Background image (mobile)',
			type: 'image',
			options: {
				hotspot: true,
			},
			fieldset: 'image',
			group: 'image',
		}),
	],
	preview: {
		select: {
			content: 'content',
			media: 'bgImage',
		},
		prepare: ({ content, media }) => ({
			title: getBlockText(content),
			subtitle: 'Hero',
			media,
		}),
	},
})
