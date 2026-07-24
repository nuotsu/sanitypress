import { defineArrayMember, defineField } from 'sanity'
import { NumberIcon } from '@sanity/icons/Number'
import { count, getBlockText } from '@/lib/utils'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'stat-list',
	title: 'Stat list',
	type: 'object',
	icon: NumberIcon,
	groups: [
		{ name: 'content', default: true },
		{ name: 'options' },
	],
	fields: [
		defineField({
			name: 'eyebrow',
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
			name: 'stats',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'stat',
					type: 'object',
					fieldsets: [{ name: 'stat', options: { columns: 2 } }],
					fields: [
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
							name: 'content',
							type: 'array',
							of: [{ type: 'block' }],
						}),
					],
					preview: {
						select: {
							value: 'value',
							suffix: 'suffix',
							content: 'content',
						},
						prepare: ({ value, suffix, content }) => ({
							title: [value, suffix].filter(Boolean).join(' '),
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
				list: ['grid', 'carousel'],
			},
			group: 'options',
		}),
		defineField({
			name: 'columns',
			type: 'number',
			description:
				'Overrides the default dynamic columns (~256px). Desktop only.',
			validation: (Rule) => Rule.min(1),
			hidden: ({ parent }) => parent?.layout === 'carousel',
			group: 'options',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			stats: 'stats',
		},
		prepare: ({ intro, stats }) => ({
			title: getBlockText(intro),
			subtitle: `Stat list (${count(stats, 'stat')})`,
		}),
	},
})
