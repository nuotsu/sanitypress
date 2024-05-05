import { defineField, defineType } from 'sanity'
import { GrBlockQuote } from 'react-icons/gr'

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
				}),
			],
		}),
	],
	preview: {
		select: {
			author: 'author',
		},
		prepare: ({ author }) => ({
			title: author?.name || 'No author',
			subtitle: 'Testimonial',
			media: author?.image,
		}),
	},
})
