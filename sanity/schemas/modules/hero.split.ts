import { defineField, defineType } from 'sanity'
import { TfiLayoutMediaLeft } from 'react-icons/tfi'
import { getBlockText } from '@sanity/src/utils'

export default defineType({
	name: 'hero.split',
	title: 'Hero (split)',
	icon: TfiLayoutMediaLeft,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'image' }],
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
			name: 'image',
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
					name: 'onRight',
					type: 'boolean',
					initialValue: false,
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
			group: 'image',
		}),
	],
	preview: {
		select: {
			content: 'content',
			media: 'image.asset',
		},
		prepare: ({ content, media }) => ({
			title: getBlockText(content),
			subtitle: 'Hero (split)',
			media,
		}),
	},
})
