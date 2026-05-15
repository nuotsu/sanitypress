import { defineField } from 'sanity'
import { CodeIcon } from '@sanity/icons'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'custom-html',
	title: 'Custom HTML',
	icon: CodeIcon,
	type: 'object',
	groups: [
		{ name: 'html', title: 'HTML', default: true },
		{ name: 'css', title: 'CSS' },
	],
	fields: [
		defineField({
			name: 'className',
			description: 'Optional class name to apply to the root HTML element',
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
			group: 'html',
		}),
		defineField({
			name: 'css',
			title: 'CSS',
			type: 'code',
			options: {
				language: 'css',
				languageAlternatives: [{ title: 'CSS', value: 'css' }],
			},
			group: 'css',
		}),
	],
	preview: {
		select: {
			html: 'html.code',
			css: 'css.code',
		},
		prepare: ({ html, css }) => {
			return {
				title: html || css,
				subtitle: `Custom ${[html && 'HTML', html?.includes('<script') && 'JS', css && 'CSS'].filter(Boolean).join(' / ')}`,
			}
		},
	},
})
