import { defineField, defineType } from 'sanity'
import { VscLayoutPanelJustify } from 'react-icons/vsc'

export default defineType({
	name: 'footer',
	title: 'Footer',
	icon: VscLayoutPanelJustify,
	type: 'document',
	fields: [
		defineField({
			name: 'menu',
			type: 'array',
			of: [{ type: 'link' }, { type: 'link.list' }],
		}),
	],
	preview: {
		prepare: () => ({
			title: 'Footer',
		}),
	},
})
