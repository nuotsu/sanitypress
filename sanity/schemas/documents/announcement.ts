import { defineField, defineType } from 'sanity'
import { VscMegaphone } from 'react-icons/vsc'
import { getBlockText } from '../../src/utils'

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
			start: 'start',
			end: 'end',
		},
		prepare: ({ content, start, end }) => ({
			title: getBlockText(content),
			subtitle: [formatDate(start), formatDate(end)]
				.filter(Boolean)
				.join(' - '),
		}),
	},
})

const { format } = new Intl.DateTimeFormat('en', {
	month: 'numeric',
	day: 'numeric',
	hour: '2-digit',
	minute: 'numeric',
	hour12: false,
})

function formatDate(date: string) {
	if (!date) return ''
	return format(new Date(date))
}
