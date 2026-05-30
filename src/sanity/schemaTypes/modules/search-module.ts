import { defineField } from 'sanity'
import { SearchIcon } from '@sanity/icons'
import { getBlockText } from '@/lib/utils'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'search-module',
	title: 'Search',
	type: 'object',
	icon: SearchIcon,
	groups: [{ name: 'content', default: true }, { name: 'options' }],
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
			name: 'scope',
			type: 'string',
			options: {
				list: ['all', 'pages', 'blog posts'],
				layout: 'radio',
			},
			initialValue: 'all',
			group: 'options',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
		},
		prepare: ({ intro }) => ({
			title: getBlockText(intro),
			subtitle: 'Search',
		}),
	},
})
