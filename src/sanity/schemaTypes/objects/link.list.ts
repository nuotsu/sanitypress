import { defineField, defineType } from 'sanity'
import { FolderIcon } from '@sanity/icons/Folder'
import { count } from '@/lib/utils'

export default defineType({
	name: 'link.list',
	title: 'Link list',
	icon: FolderIcon,
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
