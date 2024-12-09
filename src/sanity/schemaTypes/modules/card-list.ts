import { defineArrayMember, defineField, defineType } from 'sanity'
import { TfiLayoutMediaLeftAlt } from 'react-icons/tfi'
import { count, getBlockText } from '@/sanity/lib/utils'

export default defineType({
	name: 'card-list',
	title: 'Card list',
	icon: TfiLayoutMediaLeftAlt,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'uid',
			title: 'Unique Identifier',
			type: 'uid',
			group: 'options',
		}),
		defineField({
			name: 'pretitle',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'cards',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({
							name: 'image',
							type: 'image',
							options: {
								hotspot: true,
							},
						}),
						defineField({
							name: 'content',
							type: 'array',
							of: [{ type: 'block' }],
						}),
						defineField({
							name: 'ctas',
							title: 'Call-to-actions',
							type: 'array',
							of: [{ type: 'cta' }],
						}),
					],
				}),
			],
			group: 'content',
		}),
		defineField({
			name: 'layout',
			type: 'string',
			options: {
				list: ['grid', 'carousel'],
				layout: 'radio',
			},
			group: 'options',
			initialValue: 'carousel',
		}),
		defineField({
			name: 'visualSeparation',
			type: 'boolean',
			initialValue: true,
			group: 'options',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			cards: 'cards',
		},
		prepare: ({ intro, cards }) => ({
			title: getBlockText(intro) || count(cards, 'card'),
			subtitle: 'Cards list',
		}),
	},
})
