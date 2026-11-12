import { defineField } from 'sanity'
import { CodeIcon } from '@sanity/icons/Code'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'
import { getCodeKinds } from './utils'

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
			name: 'html',
			title: 'HTML',
			type: 'code',
			options: {
				language: 'html',
				languageAlternatives: [{ title: 'HTML', value: 'html' }],
			},
			group: 'html',
			validation: (Rule) =>
				Rule.custom((value: { code?: string } | undefined) =>
					/application\/ld\+json/i.test(value?.code ?? '')
						? 'Use the "Schema markup" module for JSON-LD instead'
						: true,
				).warning(),
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
		defineField({
			name: 'className',
			description: 'Optional class name to apply to the root HTML element',
			type: 'string',
			placeholder: 'e.g. section prose text-center, etc.',
			group: 'attributes',
		}),
	],
	preview: {
		select: {
			html: 'html.code',
			css: 'css.code',
		},
		prepare: ({ html, css }) => ({
			title: html || css,
			subtitle: `Custom ${getCodeKinds(html, css).join(' / ')}`,
		}),
	},
})
