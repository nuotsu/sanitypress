import { defineField, defineType } from 'sanity'
import { GrBlockQuote } from 'react-icons/gr'
import { getBlockText } from '@sanity/src/utils'

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
			title: getBlockText(content),
			subtitle: author?.name || author?.title || 'No author',
			media: author?.image,
		}),
	},
})
