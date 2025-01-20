import { defineField, defineType } from 'sanity'
import { LuDollarSign } from 'react-icons/lu'

export default defineType({
	name: 'pricing',
	title: 'Pricing tier',
	icon: LuDollarSign,
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'highlight',
			type: 'string',
			description: 'e.g. Recommended, Most popular, etc.',
		}),
		defineField({
			name: 'price',
			type: 'object',
			options: {
				columns: 2,
			},
			fields: [
				defineField({
					name: 'base',
					type: 'number',
					description: '0 for free, empty to hide',
				}),
				defineField({
					name: 'strikethrough',
					type: 'number',
				}),
				defineField({
					name: 'suffix',
					type: 'string',
					placeholder: 'e.g. /mo, per seat, forever, etc.',
				}),
			],
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
	],
	preview: {
		select: {
			title: 'title',
			price: 'price',
		},
		prepare: ({ title, price }) => ({
			title,
			subtitle: [
				price?.base || 'Free',
				price?.strikethrough && `(${price.strikethrough})`,
				price?.suffix,
			]
				.filter(Boolean)
				.join(' '),
		}),
	},
})
