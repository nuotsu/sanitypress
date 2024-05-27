import { defineField, defineType } from 'sanity'
import { VscCode } from 'react-icons/vsc'

export default defineType({
	name: 'code-block',
	type: 'object',
	icon: VscCode,
	fieldsets: [{ name: 'metadata', options: { columns: 2 } }],
	fields: [
		defineField({
			name: 'language',
			type: 'string',
			fieldset: 'metadata',
		}),
		defineField({
			name: 'filename',
			type: 'string',
			fieldset: 'metadata',
		}),
		defineField({
			name: 'decorations',
			type: 'array',
			of: [{ type: 'string' }],
			options: { layout: 'tags' },
			description: 'Line numbers to highlight',
			fieldset: 'metadata',
		}),
		defineField({
			name: 'code',
			type: 'text',
			rows: 10,
		}),
	],
	preview: {
		select: {
			language: 'language',
			filename: 'filename',
			code: 'code',
		},
		prepare: ({ language, filename, code }) => ({
			title: code,
			subtitle: filename || language,
		}),
	},
})
