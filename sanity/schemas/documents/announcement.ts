import { defineField, defineType } from 'sanity'
import { VscMegaphone } from 'react-icons/vsc'
import { getBlockText } from '@sanity/src/utils'

export default defineType({
	name: 'announcement',
	title: 'Announcement',
	icon: VscMegaphone,
	type: 'document',
	fieldsets: [{ name: 'schedule', options: { columns: 2 } }],
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [{ title: 'Normal', value: 'normal' }],
				},
			],
		}),
		defineField({
			name: 'cta',
			title: 'Call-to-action',
			type: 'link',
		}),
		defineField({
			name: 'start',
			title: 'Start',
			type: 'datetime',
			fieldset: 'schedule',
		}),
		defineField({
			name: 'end',
			title: 'End',
			type: 'datetime',
			fieldset: 'schedule',
		}),
	],
	preview: {
		select: {
			content: 'content',
			cta: 'cta.label',
		},
		prepare: ({ content, cta }) => ({
			title: getBlockText(content),
			subtitle: cta,
		}),
	},
})
