import { defineField } from 'sanity'
import { ComponentIcon } from '@sanity/icons'
import { count, getBlockText } from '@/lib/utils'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'logo-list',
	title: 'Logo list',
	type: 'object',
	icon: ComponentIcon,
	groups: [
		{ name: 'content', default: true },
		{ name: 'logos' },
		{ name: 'options' },
	],
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
			name: 'logos',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'logo' }] }],
			group: 'logos',
		}),
		defineField({
			name: 'logoType',
			type: 'string',
			options: {
				list: ['default', 'dark', 'light'],
			},
			group: 'logos',
		}),
		defineField({
			name: 'autoScroll',
			type: 'boolean',
			initialValue: false,
			group: 'options',
		}),
		defineField({
			name: 'duration',
			type: 'number',
			description: 'Duration in seconds for a complete cycle',
			initialValue: 12,
			hidden: ({ parent }) => !parent?.autoScroll,
			group: 'options',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			logos: 'logos',
		},
		prepare: ({ intro, logos }) => ({
			title: getBlockText(intro) || count(logos, 'logo'),
			subtitle: 'Logo list',
		}),
	},
})
