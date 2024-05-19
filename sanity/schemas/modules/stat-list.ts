import { defineArrayMember, defineField, defineType } from 'sanity'
import { GoNumber } from 'react-icons/go'
import { count, getBlockText } from '../../src/utils'

export default defineType({
	name: 'stat-list',
	title: 'Stat list',
	icon: GoNumber,
	type: 'object',
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
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
		}),
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
