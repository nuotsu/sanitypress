import { defineField, defineType } from 'sanity'
import { GrBlockQuote } from 'react-icons/gr'
import { getBlockText } from '@sanity/src/utils'

export default defineType({
	name: 'testimonial.featured',
	title: 'Testimonial (featured)',
	icon: GrBlockQuote,
	type: 'object',
	fields: [
		defineField({
			name: 'testimonial',
			type: 'reference',
			to: [{ type: 'testimonial' }],
		}),
	],
	preview: {
		select: {
			testimonial: 'testimonial.content',
		},
		prepare: ({ testimonial }) => {
			return {
				title: getBlockText(testimonial),
				subtitle: 'Testimonial (featured)',
			}
		},
	},
})
