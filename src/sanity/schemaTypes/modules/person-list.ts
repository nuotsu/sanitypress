import { defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'
import { getBlockText } from '@/lib/utils'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'person-list',
	title: 'Person list',
	type: 'object',
	icon: UsersIcon,
	groups: [{ name: 'content', default: true }],
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'people',
			type: 'array',
			of: [{ type: 'person' }, { type: 'reference', to: [{ type: 'person' }] }],
			group: 'content',
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
