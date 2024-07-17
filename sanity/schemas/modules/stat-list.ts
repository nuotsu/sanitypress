import { defineArrayMember, defineField, defineType } from 'sanity'
import { GoNumber } from 'react-icons/go'
import { textAlign } from '../fragments/fields/alignment'
import { count, getBlockText } from '@sanity/src/utils'

export default defineType({
	name: 'stat-list',
	title: 'Stat list',
	icon: GoNumber,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'stats',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					fields: [
						defineField({
							name: 'value',
							type: 'string',
						}),
						defineField({
							name: 'subValue',
							type: 'string',
						}),
						defineField({
							name: 'text',
							type: 'string',
						}),
					],
					preview: {
						select: {
							value: 'value',
							subValue: 'subValue',
							subtitle: 'text',
						},
						prepare: ({ value, subValue, subtitle }) => ({
							title: [value, subValue].filter(Boolean).join(' '),
							subtitle,
						}),
					},
				}),
			],
			group: 'content',
		}),
		defineField(textAlign),
	],
	preview: {
		select: {
			intro: 'intro',
			stats: 'stats',
		},
		prepare: ({ intro, stats }) => ({
			title: getBlockText(intro) || count(stats, 'stat'),
			subtitle: 'Stat list',
		}),
	},
})
