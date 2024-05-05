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
			name: 'content',
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
							name: 'text',
							type: 'string',
						}),
					],
					preview: {
						select: {
							title: 'value',
							subtitle: 'text',
						},
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			content: 'content',
			stats: 'stats',
		},
		prepare: ({ content, stats }) => ({
			title: getBlockText(content) || count(stats, 'stat'),
			subtitle: 'Stat list',
		}),
	},
})
