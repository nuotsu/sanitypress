import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscQuestion } from 'react-icons/vsc'
import { getBlockText } from '@sanity/src/utils'

export default defineType({
	name: 'accordion-list',
	title: 'Accordion list',
	type: 'object',
	icon: VscQuestion,
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'options', title: 'Options' },
	],
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'items',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					icon: VscQuestion,
					fields: [
						defineField({
							name: 'summary',
							type: 'string',
						}),
						defineField({
							name: 'content',
							type: 'array',
							of: [{ type: 'block' }],
						}),
						defineField({
							name: 'open',
							type: 'boolean',
							initialValue: false,
						}),
					],
					preview: {
						select: {
							title: 'summary',
							content: 'content',
						},
						prepare: ({ title, content }) => ({
							title,
							subtitle: getBlockText(content),
						}),
					},
				}),
			],
			group: 'content',
		}),
		defineField({
			name: 'layout',
			type: 'string',
			options: {
				layout: 'radio',
				list: ['vertical', 'horizontal'],
			},
			initialValue: 'vertical',
			group: 'options',
		}),
		defineField({
			name: 'uid',
			title: 'Unique Identifier',
			type: 'uid',
			group: 'options',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
		},
		prepare: ({ intro }) => ({
			title: getBlockText(intro),
			subtitle: 'Accordion list',
		}),
	},
})
