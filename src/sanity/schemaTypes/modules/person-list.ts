import { defineField } from 'sanity'
import { UsersIcon } from '@sanity/icons'
import { getBlockText } from '@/lib/utils'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'person-list',
	title: 'Person list',
	type: 'object',
	icon: UsersIcon,
	groups: [{ name: 'content', default: true }, { name: 'options' }],
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
			of: [{ type: 'reference', to: [{ type: 'person' }] }],
			group: 'content',
		}),
		defineField({
			name: 'columns',
			description:
				'Overrides the default dynamic columns (~256px). Desktop only.',
			validation: (Rule) => Rule.min(1),
			type: 'number',
			group: 'options',
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
