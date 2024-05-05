import { defineField, defineType } from 'sanity'
import { VscFolderOpened } from 'react-icons/vsc'
import { count } from '../../src/utils'

export default defineType({
	name: 'link.list',
	title: 'Link list',
	icon: VscFolderOpened,
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			type: 'string',
		}),
		defineField({
			name: 'links',
			type: 'array',
			of: [{ type: 'link' }],
		}),
	],
	preview: {
		select: {
			title: 'label',
			links: 'links',
		},
		prepare: ({ title, links }) => ({
			title,
			subtitle: count(links, 'link'),
		}),
	},
})
