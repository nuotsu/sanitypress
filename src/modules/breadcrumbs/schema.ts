import { defineField } from 'sanity'
import { BsBarChartSteps } from 'react-icons/bs'
import { count } from '@/lib/utils'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'breadcrumbs',
	title: 'Breadcrumbs',
	icon: BsBarChartSteps,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'structuredDataOnly',
			type: 'boolean',
			initialValue: false,
			group: 'options',
		}),
		defineField({
			name: 'crumbs',
			type: 'array',
			of: [{ type: 'link', initialValue: { type: 'internal' } }],
			description: 'The current page is included by default',
			group: 'content',
		}),
	],
	preview: {
		select: {
			crumbs: 'crumbs',
		},
		prepare: ({ crumbs }) => ({
			title: count(crumbs, 'crumb'),
			subtitle: 'Breadcrumbs',
		}),
	},
})
