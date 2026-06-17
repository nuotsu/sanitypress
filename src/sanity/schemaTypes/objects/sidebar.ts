import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscListTree } from 'react-icons/vsc'

export default defineType({
	name: 'sidebar',
	title: 'Sidebar',
	type: 'object',
	fields: [
		defineField({
			name: 'position',
			type: 'string',
			options: {
				list: ['left', 'right'],
			},
		}),
		defineField({
			name: 'modules',
			type: 'array',
			of: [
				{ type: 'callout' },
				{ type: 'custom-html' },
				defineArrayMember({
					name: 'tableOfContents',
					type: 'object',
					icon: VscListTree,
					fields: [
						defineField({
							name: 'summary',
							type: 'string',
							placeholder: 'e.g. On this page, etc.',
						}),
					],
					preview: {
						select: {
							summary: 'summary',
						},
						prepare: ({ summary = 'Table of Contents' }) => ({
							title: summary,
							subtitle: 'Table of Contents',
						}),
					},
				}),
			],
		}),
	],
})
