import { defineField, defineType } from 'sanity'
import { GrBlockQuote } from 'react-icons/gr'
import { getBlockText } from '../../src/utils'

export default defineType({
	name: 'testimonial-list',
	title: 'Testimonial list',
	icon: GrBlockQuote,
	type: 'object',
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'testimonials',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
		}),
	],
	preview: {
		select: {
			content: 'content',
			testimonials: 'testimonials',
		},
		prepare: ({ content, testimonials }) => ({
			title:
				getBlockText(content) || `${testimonials?.length || 0} testimonials`,
			subtitle: 'Testimonial list',
		}),
	},
})
