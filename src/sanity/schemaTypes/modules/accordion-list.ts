import { defineArrayMember, defineField, defineType } from 'sanity'
import { TfiLayoutAccordionMerged } from 'react-icons/tfi'
import { getBlockText } from '@/lib/utils'
import { imageBlock } from '../fragments'

export default defineType({
	name: 'accordion-list',
	title: 'Accordion list',
	type: 'object',
	icon: TfiLayoutAccordionMerged,
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'options',
			title: 'Module options',
			type: 'module-options',
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
			name: 'items',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'accordion',
					icon: TfiLayoutAccordionMerged,
					fields: [
						defineField({
							name: 'summary',
							type: 'string',
						}),
						defineField({
							name: 'content',
							type: 'array',
							of: [
								{ type: 'block' },
								imageBlock,
								defineArrayMember({
									title: 'Code block',
									type: 'code',
									options: {
										withFilename: true,
									},
								}),
								{ type: 'custom-html' },
							],
						}),
						defineField({
							name: 'open',
							type: 'boolean',
							initialValue: false,
						}),
					],
					preview: {
						select: {
							title: 'summary',
							content: 'content',
						},
						prepare: ({ title, content }) => ({
							title,
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
				layout: 'radio',
				list: ['vertical', 'horizontal'],
			},
			initialValue: 'vertical',
			group: 'options',
		}),
		defineField({
			name: 'connect',
			title: 'Connect accordions',
			description: 'Allows only one accordion to be expanded at a time',
			type: 'boolean',
			initialValue: false,
			group: 'options',
		}),
		defineField({
			name: 'generateSchema',
			title: 'Generate schema.org schema',
			type: 'boolean',
			description: 'Recommended for FAQ content',
			initialValue: false,
			group: 'options',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
		},
		prepare: ({ intro }) => ({
			title: getBlockText(intro),
			subtitle: 'Accordion list',
		}),
	},
})
