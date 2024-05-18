import { defineField, defineType } from 'sanity'
import { getBlockText } from '../../src/utils'
import { VscSymbolMisc } from 'react-icons/vsc'

export default defineType({
	name: 'logo-list',
	title: 'Logo list',
	icon: VscSymbolMisc,
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
			name: 'logoType',
			type: 'string',
			options: {
				layout: 'radio',
				list: ['default', 'light', 'dark'],
			},
			initialValue: 'default',
		}),
		defineField({
			name: 'logos',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'logo' }] }],
			description: 'Leave empty to display all logos',
		}),
	],
	preview: {
		select: {
			pretitle: 'pretitle',
			content: 'content',
		},
		prepare: ({ pretitle, content }) => ({
			title: getBlockText(content) || pretitle,
			subtitle: 'Logo list',
		}),
	},
})
