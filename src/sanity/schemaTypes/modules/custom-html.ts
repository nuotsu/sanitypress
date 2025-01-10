import { defineField, defineType } from 'sanity'
import { VscCode } from 'react-icons/vsc'

export default defineType({
	name: 'custom-html',
	title: 'Custom HTML',
	icon: VscCode,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'options',
			type: 'module-options',
			group: 'options',
		}),
		defineField({
			name: 'className',
			type: 'string',
			group: 'options',
		}),
		defineField({
			name: 'html',
			title: 'HTML',
			type: 'code',
			options: {
				language: 'html',
				languageAlternatives: [{ title: 'HTML', value: 'html' }],
			},
			group: 'content',
		}),
	],
	preview: {
		select: {
			code: 'html.code',
		},
		prepare: ({ code }) => ({
			title: code,
			subtitle: 'Custom HTML',
		}),
	},
})
