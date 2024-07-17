import { defineField, defineType } from 'sanity'
import { VscEdit } from 'react-icons/vsc'
import { getBlockText } from '@sanity/src/utils'

export default defineType({
	name: 'blog-list',
	title: 'Blog list',
	icon: VscEdit,
	type: 'object',
	groups: [
		{ name: 'content', default: true },
		{ name: 'filtering' },
		{ name: 'options' },
	],
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
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
		}),
		defineField({
			name: 'limit',
			type: 'number',
			description: 'Number of posts to show. Leave empty to show all posts.',
			validation: (Rule) => Rule.min(1).integer(),
			group: 'filtering',
		}),
		defineField({
			name: 'displayFilters',
			title: 'Display category filter buttons',
			type: 'boolean',
			initialValue: false,
			group: 'filtering',
		}),
		defineField({
			name: 'predefinedFilters',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'blog.category' }],
				},
			],
			description: 'Filter posts by category',
			group: 'filtering',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
		},
		prepare: ({ intro }) => ({
			title: getBlockText(intro),
			subtitle: 'Blog list',
		}),
	},
})
