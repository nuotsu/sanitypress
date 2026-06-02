import { defineArrayMember, defineField } from 'sanity'
import { TfiLayoutGrid2Thumb } from 'react-icons/tfi'
import { count, getBlockText } from '@/lib/utils'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'card-list',
	title: 'Card list',
	type: 'object',
	icon: TfiLayoutGrid2Thumb,
	groups: [{ name: 'content', default: true }, { name: 'options' }],
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
			name: 'cards',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'card',
					type: 'object',
					fieldsets: [{ name: 'asset', options: { columns: 2 } }],
					fields: [
						defineField({
							name: 'image',
							type: 'image',
							options: {
								hotspot: true,
							},
							fieldset: 'asset',
						}),
						defineField({
							name: 'icon',
							type: 'image',
							options: {
								hotspot: true,
							},
							fieldset: 'asset',
						}),
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
					preview: {
						select: {
							content: 'content',
							cta: 'ctas.0.link.label',
							image: 'image',
							icon: 'icon',
						},
						prepare: ({ content, cta, image, icon }) => ({
							title: getBlockText(content),
							subtitle: cta,
							media: image || icon,
						}),
					},
				}),
			],
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
			name: 'columns',
			type: 'number',
			description:
				'Overrides the default dynamic columns (~256px). Desktop only.',
			validation: (Rule) => Rule.min(1),
			group: 'options',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			cards: 'cards',
		},
		prepare: ({ intro, cards }) => ({
			title: getBlockText(intro) || count(cards, 'card'),
			subtitle: 'Card list',
		}),
	},
})
