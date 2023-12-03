import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'

export default defineType({
	name: 'hero.centered',
	title: 'Hero (centered)',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	fields: [
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
	],
	preview: {
		select: {
			content: 'content',
			media: 'image.asset',
		},
		prepare: ({ content, media }) => ({
			title: content[0]?.children[0]?.text,
			subtitle: 'Hero (centered)',
			media,
		}),
	},
})
