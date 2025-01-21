import { defineField, defineType } from 'sanity'
import { GoPerson } from 'react-icons/go'
import { getBlockText } from '@/sanity/lib/utils'

export default defineType({
	name: 'person-list',
	title: 'Person list',
	type: 'object',
	icon: GoPerson,
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
		}),
		defineField({
			name: 'people',
			type: 'array',
			of: [{ type: 'person' }],
		}),
	],
	preview: {
		select: {
			intro: 'intro',
		},
		prepare: ({ intro }) => ({
			title: getBlockText(intro),
			subtitle: 'Person list',
		}),
	},
})
