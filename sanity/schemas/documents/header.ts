import { defineField, defineType } from 'sanity'
import { VscLayoutMenubar } from 'react-icons/vsc'

export default defineType({
	name: 'header',
	title: 'Header',
	icon: VscLayoutMenubar,
	type: 'document',
	fields: [
		defineField({
			name: 'menu',
			type: 'array',
			of: [{ type: 'link' }, { type: 'link.list' }],
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		}),
	],
	preview: {
		prepare: () => ({
			title: 'Header',
		}),
	},
})
