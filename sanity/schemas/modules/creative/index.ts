import { defineArrayMember, defineField, defineType } from 'sanity'
import creativeCtas from './creativeCtas'
import creativeIcon from './creativeIcon'
import creativeImage from './creativeImage'
import creativeRichtext from './creativeRichtext'
import { count, getBlockText } from '../../../src/utils'

import { VscExtensions } from 'react-icons/vsc'

export default defineType({
	name: 'creative-module',
	title: 'Creative module',
	icon: VscExtensions,
	type: 'object',
	groups: [
		{ title: 'Content', name: 'content', default: true },
		{ title: 'Options', name: 'options' },
	],
	fields: [
		defineField({
			name: 'content',
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
						},
						prepare: ({ subModules }) => {
							return {
								title: subModules
									.map(
										(subModule: any) =>
											subModule.title || subModule.name || subModule._type,
									)
									.filter(Boolean)
									.join(' + '),
							}
						},
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
			name: 'textAlign',
			type: 'string',
			options: {
				list: ['left', 'center', 'right'],
			},
			initialValue: 'left',
			group: 'options',
		}),
		defineField({
			name: 'alignItems',
			title: 'Vertical alignment',
			type: 'string',
			options: {
				list: [
					{ title: 'Top', value: 'start' },
					'center',
					{ title: 'Bottom', value: 'end' },
				],
			},
			initialValue: 'center',
			group: 'options',
		}),
	],
	preview: {
		select: {
			content: 'content',
			modules: 'modules',
		},
		prepare: ({ content, modules }) => ({
			title: getBlockText(content),
			subtitle: count(modules, 'module'),
		}),
	},
})
