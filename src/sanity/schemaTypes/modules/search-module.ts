import { defineField, defineType } from 'sanity'
import { VscSearch } from 'react-icons/vsc'
import { getBlockText } from '@/sanity/lib/utils'

export default defineType({
	name: 'search-module',
	title: 'Search module',
	icon: VscSearch,
	type: 'object',
	fields: [
		defineField({
			name: 'pretitle',
			type: 'string',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'scope',
			type: 'string',
			options: {
				list: ['all', 'pages', 'blog posts'],
				layout: 'radio',
			},
			initialValue: 'all',
		}),
	],
	preview: {
		select: {
			content: 'content',
			scope: 'scope',
		},
		prepare: ({ content, scope }) => ({
			title: getBlockText(content) || (scope && `Search ${scope}`),
			subtitle: 'Search module',
		}),
	},
})
