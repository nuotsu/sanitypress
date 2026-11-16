import { defineArrayMember, defineField, defineType } from 'sanity'
import { CodeBlockIcon } from '@sanity/icons/CodeBlock'

export default defineType({
	name: 'code-group',
	title: 'Code group',
	description:
		'Tabbed code blocks, e.g. npm vs bun, or JavaScript vs TypeScript',
	type: 'object',
	icon: CodeBlockIcon,
	fields: [
		defineField({
			name: 'tabs',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'code-tab',
					title: 'Tab',
					type: 'object',
					fields: [
						defineField({
							name: 'label',
							type: 'string',
							description: 'Falls back to the filename, then the language',
						}),
						defineField({
							name: 'code',
							type: 'code',
							options: { withFilename: true },
						}),
					],
					preview: {
						select: {
							label: 'label',
							filename: 'code.filename',
							language: 'code.language',
						},
						prepare: ({ label, filename, language }) => ({
							title: label || filename || language,
							subtitle: label ? filename || language : undefined,
						}),
					},
				}),
			],
			validation: (rule) => rule.min(2),
		}),
		defineField({
			name: 'syncKey',
			title: 'Sync key',
			type: 'string',
			description:
				'Groups with the same key switch together and remember the choice, e.g. "package-manager" or "language"',
		}),
	],
	preview: {
		select: { tabs: 'tabs', syncKey: 'syncKey' },
		prepare: ({ tabs, syncKey }) => ({
			title: (tabs as any[] | undefined)
				?.map((tab) => tab.label || tab.code?.filename || tab.code?.language)
				.filter(Boolean)
				.join(' / '),
			subtitle: ['Code group', syncKey].filter(Boolean).join(' · '),
		}),
	},
})
