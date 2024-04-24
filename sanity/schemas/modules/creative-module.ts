import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscExtensions, VscSymbolKeyword } from 'react-icons/vsc'
import { IoIosImage } from 'react-icons/io'
import { getBlockText } from '../../src/utils'

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
		defineField({
			name: 'modules',
			type: 'array',
			of: [
				defineArrayMember({
					title: 'Image',
					icon: IoIosImage,
					type: 'image',
					fields: [
						defineField({
							name: 'alt',
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
						defineField({
							name: 'ctas',
							title: 'Call-to-actions',
							type: 'array',
							of: [{ type: 'cta' }],
						}),
					],
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
