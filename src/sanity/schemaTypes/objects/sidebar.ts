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
						defineField({
							name: 'maxHeadingDepth',
							type: 'number',
							description:
								'Include headings from H2 up to this level (2 = H2 only, 6 = H2-H6)',
							validation: (Rule) => Rule.min(2).max(6).integer(),
							initialValue: 6,
						}),
					],
					preview: {
						select: {
							summary: 'summary',
							maxHeadingDepth: 'maxHeadingDepth',
						},
						prepare: ({
							summary = 'Table of Contents',
							maxHeadingDepth = 6,
						}) => ({
							title: summary,
							subtitle: `H2-H${maxHeadingDepth}`,
						}),
					},
				}),
			],
		}),
	],
})
