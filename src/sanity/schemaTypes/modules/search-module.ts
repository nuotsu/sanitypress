import { defineField, defineType } from 'sanity'
import { VscSearch } from 'react-icons/vsc'
import { getBlockText } from '@/lib/utils'

export default defineType({
	name: 'search-module',
	title: 'Search module',
	icon: VscSearch,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'options' }],
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
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		}),
		defineField({
			name: 'scope',
			type: 'string',
			options: {
				list: ['all', 'pages', 'path', 'blog posts'],
				layout: 'radio',
			},
			initialValue: 'all',
			group: 'options',
		}),
		defineField({
			name: 'path',
			type: 'string',
			description: 'Filter results to a specific path',
			placeholder: 'e.g. docs/*',
			hidden: ({ parent }) => parent?.scope !== 'path',
			validation: (Rule) => Rule.regex(/\*$/).error('Must end with a *'),
			group: 'options',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			scope: 'scope',
		},
		prepare: ({ intro, scope }) => ({
			title: getBlockText(intro) || (scope && `Search ${scope}`),
			subtitle: 'Search module',
		}),
	},
})
