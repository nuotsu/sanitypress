import { defineArrayMember, defineField, defineType } from 'sanity'
import { TfiLayoutGrid2Thumb } from 'react-icons/tfi'
import { getBlockText } from '@/lib/utils'
import { count } from '@/lib/utils'

export default defineType({
	name: 'flag-list',
	title: 'Flag list',
	icon: TfiLayoutGrid2Thumb,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'pretitle',
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
			name: 'items',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'flag',
					fields: [
						defineField({
							name: 'icon',
							type: 'icon',
						}),
						defineField({
							name: 'content',
							type: 'array',
							of: [{ type: 'block' }],
						}),
					],
					preview: {
						select: {
							content: 'content',
							ic0n: 'icon.ic0n',
							image: 'icon.image',
						},
						prepare: ({ content, image, ic0n }) => ({
							title: getBlockText(content),
							media: ic0n ? <img src={`https://ic0n.dev/${ic0n}`} /> : image,
						}),
					},
				}),
			],
			group: 'content',
		}),
		defineField({
			name: 'iconPosition',
			type: 'string',
			options: {
				list: ['top', 'left'],
				layout: 'radio',
			},
			initialValue: 'left',
			group: 'options',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			items: 'items',
		},
		prepare: ({ intro, items }) => ({
			title: getBlockText(intro) || count(items),
			subtitle: 'Flag list',
		}),
	},
})
