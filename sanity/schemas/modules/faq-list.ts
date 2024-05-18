import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscQuestion } from 'react-icons/vsc'
import { getBlockText } from '../../src/utils'

export default defineType({
	name: 'faq-list',
	title: 'FAQ list',
	type: 'object',
	icon: VscQuestion,
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'options', title: 'Options' },
	],
	fields: [
		defineField({
			name: 'content',
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
							name: 'question',
							type: 'string',
						}),
						defineField({
							name: 'answer',
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
							title: 'question',
							answer: 'answer',
						},
						prepare: ({ title, answer }) => ({
							title,
							subtitle: getBlockText(answer),
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
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }) => ({
			title: getBlockText(content),
			subtitle: 'FAQ list',
		}),
	},
})
