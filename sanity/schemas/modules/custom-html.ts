import { defineField, defineType } from 'sanity'
import { VscCode } from 'react-icons/vsc'

export default defineType({
	name: 'custom-html',
	title: 'Custom HTML',
	icon: VscCode,
	type: 'object',
	fields: [
		defineField({
			name: 'html',
			title: 'HTML',
			type: 'text',
			rows: 10,
		}),
	],
})
