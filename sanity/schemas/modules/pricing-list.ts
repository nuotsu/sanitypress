import { defineField, defineType } from 'sanity'
import { LuDollarSign } from 'react-icons/lu'
import { count, getBlockText } from '@sanity/src/utils'

export default defineType({
	name: 'pricing-list',
	title: 'Pricing list',
	icon: LuDollarSign,
	type: 'object',
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'tiers',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'pricing' }],
				},
			],
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			tiers: 'tiers',
		},
		prepare: ({ intro, tiers }) => ({
			title: getBlockText(intro) || count(tiers, 'tier'),
			subtitle: 'Pricing list',
		}),
	},
})
