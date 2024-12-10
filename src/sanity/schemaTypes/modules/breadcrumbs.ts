import { defineField, defineType } from 'sanity'
import { BsBarChartSteps } from 'react-icons/bs'
import { count } from '@/lib/utils'

export default defineType({
	name: 'breadcrumbs',
	title: 'Breadcrumbs',
	icon: BsBarChartSteps,
	type: 'object',
	fields: [
		defineField({
			name: 'crumbs',
			type: 'array',
			of: [{ type: 'link', initialValue: { type: 'internal' } }],
			description: 'Current page is automatically included',
		}),
		defineField({
			name: 'hideCurrent',
			title: 'Hide current page',
			type: 'boolean',
			initialValue: false,
		}),
	],
	preview: {
		select: {
			crumbs: 'crumbs',
		},
		prepare: ({ crumbs }) => ({
			title: count(crumbs, 'crumb') + ' + Current page',
			subtitle: 'Breadcrumbs',
		}),
	},
})
