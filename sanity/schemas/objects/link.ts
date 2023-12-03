import { defineField, defineType } from 'sanity'

export default defineType({
	name: 'link',
	title: 'Link',
	type: 'object',
	fields: [
		defineField({
			name: 'label',
			type: 'string',
		}),
		defineField({
			name: 'type',
			type: 'string',
			options: {
				layout: 'radio',
				list: [
					{ title: 'internal', value: 'internal' },
					{ title: 'external', value: 'external' },
				],
			},
			initialValue: 'internal',
		}),
		defineField({
			name: 'internal',
			type: 'reference',
			to: [{ type: 'page' }],
			hidden: ({ parent }) => parent?.type !== 'internal',
		}),
		defineField({
			name: 'external',
			type: 'url',
			validation: (Rule) =>
				Rule.uri({
					scheme: ['http', 'https', 'mailto', 'tel'],
					allowRelative: true,
				}),
			hidden: ({ parent }) => parent?.type !== 'external',
		}),
	],
})
