import { defineArrayMember, defineField, defineType } from 'sanity'
import creativeCtas from './creativeCtas'
import creativeIcon from './creativeIcon'
import creativeImage from './creativeImage'
import creativeRichtext from './creativeRichtext'
import {
	textAlign,
	alignItems,
	alignmentFieldset,
} from '../../fragments/fields/alignment'
import { count, getBlockText } from '@sanity/src/utils'
import { VscExtensions } from 'react-icons/vsc'

export default defineType({
	name: 'creative-module',
	title: 'Creative module',
	icon: VscExtensions,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fieldsets: [alignmentFieldset],
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'modules',
			type: 'array',
			of: [
				defineArrayMember({
					title: 'module',
					type: 'object',
					fields: [
						defineField({
							name: 'subModules',
							type: 'array',
							of: [
								creativeCtas,
								creativeIcon,
								creativeImage,
								creativeRichtext,
								{ type: 'custom-html' },
							],
						}),
						defineField({
							name: 'colSpan',
							title: 'Column span',
							type: 'number',
							validation: (Rule) => Rule.min(1).integer(),
						}),
					],
					preview: {
						select: {
							subModules: 'subModules',
							colSpan: 'colSpan',
						},
						prepare: ({ subModules, colSpan }) => ({
							title: subModules
								.map((subModule: any) => subModule._type)
								.filter(Boolean)
								.join(' + '),
							subtitle: colSpan > 1 ? `${colSpan}-column span` : undefined,
						}),
					},
				}),
			],
			group: 'content',
		}),
		defineField({
			name: 'columns',
			type: 'number',
			description: 'Leave empty to use the number of modules as columns',
			validation: (Rule) => Rule.min(1).integer(),
			group: 'options',
		}),
		defineField({
			name: 'bordered',
			type: 'boolean',
			initialValue: false,
			group: 'options',
			description:
				'When enabled, vertical alignment will be set to "stretched"',
		}),
		defineField({
			...textAlign,
			fieldset: 'alignment',
		}),
		defineField({
			...alignItems,
			fieldset: 'alignment',
			hidden: ({ parent }) => parent.bordered,
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			modules: 'modules',
		},
		prepare: ({ intro, modules }) => ({
			title: getBlockText(intro),
			subtitle: count(modules, 'module'),
		}),
	},
})
