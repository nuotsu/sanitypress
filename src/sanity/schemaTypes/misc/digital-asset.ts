import { defineField, defineType } from 'sanity'
import { VscFileZip } from 'react-icons/vsc'
import { formatCurrency } from '@/lib/utils'

export default defineType({
	name: 'digital-asset',
	title: 'Digital asset',
	type: 'document',
	icon: VscFileZip,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'stripe',
			type: 'object',
			options: {
				columns: 2,
			},
			fields: [
				defineField({
					name: 'productId',
					title: 'Product ID',
					type: 'string',
					placeholder: 'prod_...',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: 'priceId',
					title: 'Price ID',
					type: 'string',
					placeholder: 'price_...',
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: 'productId_test',
					title: 'Product ID (Test mode)',
					type: 'string',
					placeholder: 'prod_...',
				}),
				defineField({
					name: 'priceId_test',
					title: 'Price ID (Test mode)',
					type: 'string',
					placeholder: 'price_...',
				}),
			],
		}),
		defineField({
			name: 'assets',
			type: 'array',
			of: [{ type: 'file' }],
			validation: (Rule) => Rule.min(1),
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
	},
})
