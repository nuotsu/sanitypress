import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscSymbolKeyword } from 'react-icons/vsc'
import { IoIosImage } from 'react-icons/io'
import { getBlockText } from '../../src/utils'

export default defineType({
	name: 'richtext-module',
	title: 'Richtext module',
	icon: VscSymbolKeyword,
	type: 'object',
	groups: [
		{ name: 'content', title: 'Content', default: true },
		{ name: 'options', title: 'Options' },
	],
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
						defineField({
							name: 'loading',
							type: 'string',
							options: {
								list: ['lazy', 'eager'],
							},
							initialValue: 'lazy',
						}),
					],
					preview: {
						select: {
							title: 'caption',
							subtitle: 'alt',
							media: 'asset',
						},
					},
				},
				defineArrayMember({
					type: 'code',
					options: {
						withFilename: true,
					},
				}),
			],
			group: 'content',
		}),
		defineField({
			name: 'tableOfContents',
			type: 'boolean',
			initialValue: false,
			group: 'options',
		}),
		defineField({
			name: 'tocPosition',
			type: 'string',
			options: {
				list: ['left', 'right'],
				layout: 'radio',
			},
			initialValue: 'right',
			group: 'options',
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
