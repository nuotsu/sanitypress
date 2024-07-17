import { defineField, defineType } from 'sanity'
import { VscFolderOpened } from 'react-icons/vsc'
import { count } from '@sanity/src/utils'

export default defineType({
	name: 'link.list',
	title: 'Link list',
	icon: VscFolderOpened,
	type: 'object',
	fields: [
		defineField({
			name: 'link',
			type: 'link',
		}),
		defineField({
			name: 'links',
			type: 'array',
			of: [{ type: 'link' }],
		}),
	],
	preview: {
		select: {
			link: 'link',
			links: 'links',
		},
		prepare: ({ link, links }) => ({
			title: link.label || link.internal?.title,
			subtitle: count(links, 'link'),
		}),
	},
})
