import { defineField } from 'sanity'
import { FeedbackIcon } from '@sanity/icons'
import { getBlockText } from '@/lib/utils'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'quote-list',
	title: 'Quote list',
	type: 'object',
	icon: FeedbackIcon,
	groups: [{ name: 'content', default: true }],
	fields: [
		defineField({
			name: 'eyebrow',
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
			of: [{ type: 'reference', to: [{ type: 'quote' }] }],
			group: 'content',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
		},
		prepare: ({ intro }) => ({
			title: getBlockText(intro),
			subtitle: 'Quote list',
		}),
	},
})
