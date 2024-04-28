import { defineField, defineType } from 'sanity'
import { TfiLayoutMediaLeft } from 'react-icons/tfi'

export default defineType({
	name: 'hero.postcard',
	title: 'Hero (postcard)',
	icon: TfiLayoutMediaLeft,
	type: 'object',
	fields: [
		defineField({
			name: 'pretitle',
			type: 'string',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		}),
		defineField({
			name: 'image',
			type: 'image',
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
						list: ['lazy', 'eager'],
					},
					initialValue: 'lazy',
				}),
			],
		}),
	],
	preview: {
		select: {
			content: 'content',
			media: 'image.asset',
		},
		prepare: ({ content, media }) => ({
			title: content[0]?.children[0]?.text,
			subtitle: 'Hero (postcard)',
			media,
		}),
	},
})
