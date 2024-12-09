import { defineArrayMember, defineField, defineType } from 'sanity'
import { PiTabs } from 'react-icons/pi'
import { getBlockText } from '@/sanity/lib/utils'

export default defineType({
	name: 'tabbed-content',
	title: 'Tabbed content',
	icon: PiTabs,
	type: 'object',
	fields: [
		defineField({
			name: 'pretitle',
			type: 'string',
		}),
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'tabs',
			title: 'Tabs',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					groups: [{ name: 'content', default: true }, { name: 'image' }],
					fields: [
						defineField({
							name: 'label',
							type: 'string',
							group: 'content',
						}),
						defineField({
							name: 'pretitle',
							type: 'string',
							group: 'content',
						}),
						defineField({
							name: 'content',
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
							name: 'image',
							type: 'image',
							options: {
								hotspot: true,
							},
							group: 'image',
							fields: [
								defineField({
									name: 'alt',
									type: 'string',
								}),
								defineField({
									name: 'onRight',
									type: 'boolean',
									description: 'Display to the right of the content on desktop',
									initialValue: false,
								}),
								defineField({
									name: 'onBottom',
									type: 'boolean',
									description: 'Display below the content on mobile',
									initialValue: false,
								}),
								defineField({
									name: 'loading',
									type: 'string',
									options: {
										list: ['lazy', 'eager'],
										layout: 'radio',
									},
									initialValue: 'lazy',
								}),
							],
						}),
					],
					preview: {
						select: {
							content: 'content',
							label: 'label',
							image: 'image',
						},
						prepare: ({ content, label, image }) => ({
							title: getBlockText(content),
							subtitle: label,
							media: image,
						}),
					},
				}),
			],
		}),
	],
	preview: {
		select: {
			intro: 'intro',
		},
		prepare: ({ intro }) => ({
			title: getBlockText(intro),
			subtitle: 'Tabbed content',
		}),
	},
})
