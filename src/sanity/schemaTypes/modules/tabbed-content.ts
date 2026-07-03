import { defineArrayMember, defineField } from 'sanity'
import { ImageIcon } from '@sanity/icons/Image'
import { TfiLayoutTab } from 'react-icons/tfi'
import { count, getBlockText } from '@/lib/utils'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'tabbed-content',
	title: 'Tabbed content',
	type: 'object',
	icon: TfiLayoutTab,
	groups: [{ name: 'content', default: true }, { name: 'tabs' }],
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
			name: 'tabs',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'tab',
					type: 'object',
					fieldsets: [{ name: 'label', options: { columns: 2 } }],
					fields: [
						defineField({
							name: 'label',
							type: 'string',
							fieldset: 'label',
						}),
						defineField({
							name: 'icon',
							type: 'image',
							options: {
								hotspot: true,
								metadata: ['lqip'],
							},
							fieldset: 'label',
						}),
						defineField({
							name: 'content',
							type: 'array',
							of: [
								{ type: 'block' },
								defineArrayMember({
									type: 'image',
									icon: ImageIcon,
									options: {
										hotspot: true,
										metadata: ['lqip'],
									},
									fields: [
										defineField({
											name: 'alt',
											type: 'string',
										}),
									],
								}),
								{ type: 'custom-html' },
							],
						}),
						defineField({
							name: 'ctas',
							title: 'Call-to-actions',
							type: 'array',
							of: [{ type: 'cta' }],
						}),
					],
					preview: {
						select: {
							title: 'content',
							subtitle: 'label',
							media: 'icon',
						},
					},
				}),
			],
			group: 'tabs',
		}),
	],
	preview: {
		select: {
			eyebrow: 'eyebrow',
			intro: 'intro',
			tabs: 'tabs',
		},
		prepare: ({ eyebrow, intro, tabs }) => ({
			title: getBlockText(intro),
			subtitle: `Tabbed content (${count(tabs, 'tab')})`,
		}),
	},
})
