import { defineArrayMember, defineField, defineType } from 'sanity'
import { GoNumber } from 'react-icons/go'
import { textAlign } from '../fragments/fields/alignment'
import { getBlockText } from '@/sanity/lib/utils'
import { count } from '@/lib/utils'

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
					fieldsets: [{ name: 'stat', options: { columns: 3 } }],
					fields: [
						defineField({
							name: 'prefix',
							type: 'string',
							fieldset: 'stat',
						}),
						defineField({
							name: 'value',
							type: 'string',
							fieldset: 'stat',
						}),
						defineField({
							name: 'suffix',
							type: 'string',
							fieldset: 'stat',
						}),
						defineField({
							name: 'text',
							type: 'string',
						}),
					],
					preview: {
						select: {
							prefix: 'prefix',
							value: 'value',
							suffix: 'suffix',
							subtitle: 'text',
						},
						prepare: ({ prefix, value, suffix, subtitle }) => ({
							title: [prefix, value, suffix].filter(Boolean).join(' '),
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
