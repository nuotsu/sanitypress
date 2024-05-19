import { defineField, defineType } from 'sanity'
import { VscSymbolKeyword } from 'react-icons/vsc'
import { IoIosImage } from 'react-icons/io'
import { getBlockText } from '../../src/utils'

export default defineType({
	name: 'richtext-module',
	title: 'Richtext module',
	icon: VscSymbolKeyword,
	type: 'object',
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [
				{ type: 'block' },
				{
					type: 'image',
					icon: IoIosImage,
					options: {
						hotspot: true,
					},
					fields: [
						defineField({
							name: 'alt',
							type: 'string',
						}),
						defineField({
							name: 'caption',
							type: 'text',
							rows: 2,
						}),
					],
				},
				{ type: 'code-block' },
			],
		}),
		defineField({
			name: 'tableOfContents',
			type: 'boolean',
			initialValue: false,
		}),
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }) => ({
			title: getBlockText(content),
			subtitle: 'Richtext module',
		}),
	},
})
