import { defineArrayMember, defineField } from 'sanity'
import { ChevronDownIcon } from '@sanity/icons/ChevronDown'
import { ChevronRightIcon } from '@sanity/icons/ChevronRight'
import { TfiLayoutAccordionMerged } from 'react-icons/tfi'
import { count, getBlockText } from '@/lib/utils'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'accordion-list',
	title: 'Accordion list',
	type: 'object',
	icon: TfiLayoutAccordionMerged,
	groups: [
		{ name: 'content', default: true },
		{ name: 'accordions' },
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
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		}),
		defineField({
			name: 'accordions',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'accordion',
					type: 'object',
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
							title: 'Expanded by default',
							type: 'boolean',
							initialValue: false,
						}),
					],
					preview: {
						select: {
							summary: 'summary',
							content: 'content',
							open: 'open',
						},
						prepare: ({ summary, content, open }) => ({
							title: summary,
							subtitle: getBlockText(content),
							media: open ? ChevronDownIcon : ChevronRightIcon,
						}),
					},
				}),
			],
			group: 'accordions',
		}),
		defineField({
			name: 'exclusive',
			description: 'Allow only one accordion to be expanded at any time',
			type: 'boolean',
			initialValue: false,
			group: 'options',
		}),
		defineField({
			name: 'enableSchema',
			title: 'Enable schema.org markup',
			type: 'boolean',
			initialValue: true,
			group: 'options',
		}),
		defineField({
			name: 'layout',
			type: 'string',
			options: {
				list: [
					{ value: 'vertical', title: 'Vertical (stacked)' },
					{ value: 'horizontal', title: 'Horizontal (side-by-side)' },
				],
				layout: 'radio',
			},
			initialValue: 'vertical',
			group: 'options',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			accordions: 'accordions',
		},
		prepare: ({ intro, accordions }) => ({
			title: getBlockText(intro),
			subtitle: `Accordion list (${count(accordions, 'accordion')})`,
		}),
	},
})
