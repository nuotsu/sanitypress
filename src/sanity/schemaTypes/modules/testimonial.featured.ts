import { defineField, defineType } from 'sanity'
import { GrBlockQuote } from 'react-icons/gr'
import { getBlockText } from '@/lib/utils'

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
			image: 'testimonial.author.image',
		},
		prepare: ({ testimonial, image }) => {
			return {
				title: getBlockText(testimonial),
				subtitle: 'Testimonial (featured)',
				media: image,
			}
		},
	},
})
