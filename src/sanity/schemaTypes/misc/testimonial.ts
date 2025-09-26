import { defineField, defineType } from 'sanity'
import { GrBlockQuote } from 'react-icons/gr'
import { getBlockText } from '@/lib/utils'

export default defineType({
	name: 'testimonial',
	title: 'Testimonial',
	icon: GrBlockQuote,
	type: 'document',
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'source',
			type: 'url',
		}),
		defineField({
			name: 'author',
			type: 'object',
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
		}),
	],
	preview: {
		select: {
			content: 'content',
			author: 'author',
		},
		prepare: ({ content, author }) => ({
			title: author?.name || author?.title || 'No author',
			subtitle: getBlockText(content),
			media: author?.image,
		}),
	},
})
