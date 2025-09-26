import { defineField, defineType } from 'sanity'
import { GrBlockQuote } from 'react-icons/gr'
import { getBlockText } from '@/lib/utils'
import { count } from '@/lib/utils'

export default defineType({
	name: 'testimonial-list',
	title: 'Testimonial list',
	icon: GrBlockQuote,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fieldsets: [{ name: 'layout', options: { columns: 2 } }],
	fields: [
		defineField({
			name: 'pretitle',
			type: 'string',
			group: 'content',
		}),
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
			initialValue: 'carousel',
			group: 'options',
			fieldset: 'layout',
		}),
		defineField({
			name: 'layoutMobile',
			type: 'string',
			options: {
				list: ['grid', 'carousel'],
				layout: 'radio',
			},
			initialValue: 'carousel',
			group: 'options',
			fieldset: 'layout',
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
