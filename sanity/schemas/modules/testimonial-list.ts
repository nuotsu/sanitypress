import { defineField, defineType } from 'sanity'
import { GrBlockQuote } from 'react-icons/gr'
import { count, getBlockText } from '@sanity/src/utils'

export default defineType({
	name: 'testimonial-list',
	title: 'Testimonial list',
	icon: GrBlockQuote,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'testimonials',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
			group: 'content',
		}),
		defineField({
			name: 'layout',
			type: 'string',
			options: {
				list: ['grid', 'carousel'],
				layout: 'radio',
			},
			group: 'options',
			initialValue: 'carousel',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			testimonials: 'testimonials',
		},
		prepare: ({ intro, testimonials }) => ({
			title: getBlockText(intro) || count(testimonials, 'testimonial'),
			subtitle: 'Testimonial list',
		}),
	},
})
