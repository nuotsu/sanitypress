import { defineField, defineType } from 'sanity'
import { VscQuestion } from 'react-icons/vsc'
import { getBlockText } from '../../src/utils'

export default defineType({
	name: 'faq-list',
	title: 'FAQ list',
	type: 'object',
	icon: VscQuestion,
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'items',
			type: 'array',
			of: [{ type: 'faq-list.item' }],
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

export const faqListItem = defineType({
	name: 'faq-list.item',
	title: 'FAQ list item',
	type: 'object',
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
})
