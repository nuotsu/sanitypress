import { defineField } from 'sanity'
import { JsonIcon } from '@sanity/icons/Json'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'
import { getJsonLdTypes, validateJsonLd } from './utils'

export default defineModule({
	name: 'schema-markup',
	title: 'Schema markup',
	description:
		'Structured data (JSON-LD) for search engines; renders nothing visible',
	icon: JsonIcon,
	type: 'object',
	groups: [{ name: 'content', default: true }],
	fields: [
		defineField({
			name: 'code',
			title: 'JSON-LD',
			description: 'JSON only, without the <script> tag',
			type: 'code',
			options: {
				language: 'json',
				languageAlternatives: [{ title: 'JSON', value: 'json' }],
			},
			group: 'content',
			validation: (Rule) =>
				Rule.required().custom((value: { code?: string } | undefined) =>
					value ? validateJsonLd(value.code) : true,
				),
		}),
	],
	preview: {
		select: { code: 'code.code' },
		prepare: ({ code }) => ({
			title:
				['@type:', [...new Set(getJsonLdTypes(code))].join(', ')].join(' ') ||
				'Schema markup',
			subtitle: 'Schema markup',
		}),
	},
})
