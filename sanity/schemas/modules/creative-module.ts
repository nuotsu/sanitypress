import { defineArrayMember, defineField, defineType } from 'sanity'
import {
	VscExtensions,
	VscInspect,
	VscSymbolKeyword,
	VscVerified,
} from 'react-icons/vsc'
import { IoIosImage } from 'react-icons/io'
import { getBlockText } from '../../src/utils'

const subModules = [
	defineArrayMember({
		name: 'ctas',
		title: 'Call-to-actions',
		icon: VscInspect,
		type: 'object',
		fields: [
			defineField({
				name: 'ctas',
				title: 'Call-to-actions',
				type: 'array',
				of: [{ type: 'cta' }],
			}),
		],
		preview: {
			select: {
				ctas: 'ctas',
			},
			prepare: ({ ctas }) => ({
				title: `${ctas?.length || 0} CTAs`,
			}),
		},
	}),
	defineArrayMember({
		name: 'icon',
		icon: VscVerified,
		type: 'object',
		fields: [
			defineField({
				name: 'icon',
				type: 'image',
			}),
			defineField({
				name: 'height',
				type: 'number',
				description: 'px',
				validation: (Rule) => Rule.min(1).integer(),
				initialValue: 60,
			}),
		],
		preview: {
			select: {
				media: 'icon',
			},
		},
	}),
	defineArrayMember({
		name: 'image',
		icon: IoIosImage,
		type: 'image',
		fields: [
			defineField({
				name: 'alt',
				type: 'string',
			}),
			defineField({
				name: 'aspectRatio',
				type: 'string',
			}),
		],
	}),
	defineArrayMember({
		name: 'richtext',
		icon: VscSymbolKeyword,
		type: 'object',
		fields: [
			defineField({
				name: 'content',
				type: 'array',
				of: [{ type: 'block' }],
			}),
		],
		preview: {
			select: {
				content: 'content',
			},
			prepare: ({ content }) => ({
				title: getBlockText(content),
				subtitle: 'Richtext',
			}),
		},
	}),
]

export default defineType({
	name: 'creative-module',
	title: 'Creative module',
	icon: VscExtensions,
	type: 'object',
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'columns',
			type: 'number',
			description: 'Leave empty to use the number of modules as columns',
			validation: (Rule) => Rule.min(1).integer(),
		}),
		// TODO: vertical alignment
		defineField({
			name: 'modules',
			type: 'array',
			of: [
				defineArrayMember({
					title: 'module',
					type: 'object',
					fields: [
						// TODO: column span
						defineField({
							name: 'subModules',
							type: 'array',
							of: subModules,
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
		}),
	],
	preview: {
		select: {
			content: 'content',
			modules: 'modules',
		},
		prepare: ({ content, modules }) => ({
			title: getBlockText(content),
			subtitle: `${modules?.length || 0} modules`,
		}),
	},
})
