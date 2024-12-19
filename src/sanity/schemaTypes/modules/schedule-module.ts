import { defineField, defineType } from 'sanity'
import { VscCalendar } from 'react-icons/vsc'
import { count } from '@/lib/utils'

export default defineType({
	name: 'schedule-module',
	title: 'Schedule module',
	icon: VscCalendar,
	type: 'object',
	fieldsets: [{ name: 'schedule', options: { columns: 2 } }],
	fields: [
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
		defineField({
			name: 'modules',
			type: 'array',
			of: [
				{ type: 'callout' },
				{ type: 'custom-html' },
				{ type: 'hero' },
				{ type: 'hero.saas' },
				{ type: 'hero.split' },
				{ type: 'testimonial.featured' },
			],
			options: {
				insertMenu: {
					views: [
						{
							name: 'grid',
							previewImageUrl: (schemaType) =>
								`/admin/thumbnails/${schemaType}.webp`,
						},
						{ name: 'list' },
					],
					groups: [{ name: 'hero', of: ['hero', 'hero.saas', 'hero.split'] }],
				},
			},
		}),
	],
	preview: {
		select: {
			start: 'start',
			end: 'end',
			modules: 'modules',
		},
		prepare: ({ start, end, modules }) => ({
			title: `Scheduled ${[
				start && `from ${start?.split('T')[0]}`,
				end && `to ${end?.split('T')[0]}`,
			]
				.filter(Boolean)
				.join(' ')}`,
			subtitle: count(modules, 'module'),
			media: (start || end) && VscCalendar,
		}),
	},
})
