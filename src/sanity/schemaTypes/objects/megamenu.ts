import { defineArrayMember, defineField, defineType } from 'sanity'
import { FolderIcon } from '@sanity/icons'
import { TfiLayoutMediaLeftAlt } from 'react-icons/tfi'
import { count, getBlockText } from '@/lib/utils'

export default defineType({
	name: 'megamenu',
	title: 'Megamenu',
	icon: FolderIcon,
	type: 'object',
	fields: [
		defineField({
			name: 'link',
			type: 'link',
		}),
		defineField({
			name: 'items',
			type: 'array',
			of: [
				{ type: 'link.list' },
				defineArrayMember({
					name: 'link.card',
					title: 'Link card',
					type: 'object',
					icon: TfiLayoutMediaLeftAlt,
					fields: [
						defineField({
							name: 'image',
							type: 'image',
							options: {
								hotspot: true,
							},
						}),
						defineField({
							name: 'link',
							type: 'link',
						}),
						defineField({
							name: 'content',
							type: 'array',
							of: [
								{
									type: 'block',
									styles: [{ title: 'Normal', value: 'normal' }],
								},
							],
						}),
					],
					preview: {
						select: {
							image: 'image',
							label: 'link.label',
							title: 'link.internal.title',
							content: 'content',
						},
						prepare: ({ image, label, title, content }) => ({
							title: label || title,
							subtitle: getBlockText(content),
							media: image,
						}),
					},
				}),
				{ type: 'link' },
			],
		}),
	],
	preview: {
		select: {
			link: 'link',
			items: 'items',
		},
		prepare: ({ link, items }) => ({
			title: link.label || link.internal?.title,
			subtitle: `Megamenu (${count(items)})`,
		}),
	},
})
