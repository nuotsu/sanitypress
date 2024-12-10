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
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }) => ({
			title: getBlockText(content),
			subtitle: 'Search module',
		}),
	},
})
