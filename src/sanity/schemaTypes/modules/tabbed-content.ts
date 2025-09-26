import { defineArrayMember, defineField, defineType } from 'sanity'
import { PiTabs } from 'react-icons/pi'
import { getBlockText } from '@/lib/utils'

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
					name: 'tab',
					groups: [{ name: 'content', default: true }, { name: 'asset' }],
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
							name: 'assets',
							title: 'Assets',
							type: 'array',
							of: [
								{ type: 'img' },
								defineArrayMember({
									title: 'Code block',
									type: 'code',
									options: {
										withFilename: true,
									},
								}),
								{ type: 'custom-html' },
							],
							validation: (Rule) => Rule.max(1),
							group: 'asset',
						}),
						defineField({
							name: 'assetOnRight',
							type: 'boolean',
							description:
								'Display the asset to the right of the content on desktop',
							initialValue: false,
							group: 'asset',
						}),
						defineField({
							name: 'assetBelowContent',
							type: 'boolean',
							description: 'Display the asset below the content on mobile',
							initialValue: false,
							group: 'asset',
						}),
					],
					preview: {
						select: {
							content: 'content',
							label: 'label',
							asset: 'assets.0.image',
						},
						prepare: ({ content, label, asset }) => ({
							title: getBlockText(content),
							subtitle: label,
							media: asset,
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
