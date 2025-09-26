import { defineField, defineType } from 'sanity'
import { LuDollarSign } from 'react-icons/lu'
import { getBlockText } from '@/lib/utils'
import { count } from '@/lib/utils'

export default defineType({
	name: 'pricing-list',
	title: 'Pricing list',
	icon: LuDollarSign,
	type: 'object',
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'options',
			title: 'Module options',
			type: 'module-options',
			group: 'options',
		}),
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
			name: 'tiers',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'pricing' }],
				},
			],
			group: 'content',
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
