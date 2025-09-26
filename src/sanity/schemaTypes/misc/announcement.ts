import { defineField, defineType } from 'sanity'
import { VscPin, VscCalendar } from 'react-icons/vsc'
import { getBlockText } from '@/lib/utils'

export default defineType({
	name: 'announcement',
	title: 'Announcement',
	icon: VscPin,
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
			start: 'start',
			end: 'end',
		},
		prepare: ({ content, cta, start, end }) => ({
			title: getBlockText(content),
			subtitle: cta,
			media: (start || end) && VscCalendar,
		}),
	},
})
