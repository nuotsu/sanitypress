import { defineField, defineType } from 'sanity'
import {
	VscMilestone,
	VscLayoutMenubar,
	VscLayoutPanelLeft,
} from 'react-icons/vsc'
import { IoShareSocialOutline } from 'react-icons/io5'
import { count } from '@/sanity/lib/utils'

export default defineType({
	name: 'navigation',
	title: 'Navigation',
	icon: VscMilestone,
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'items',
			type: 'array',
			of: [{ type: 'link' }, { type: 'link.list' }],
		}),
	],
	preview: {
		select: {
			title: 'title',
			items: 'items',
		},
		prepare: ({ title, items }) => {
			const t = title.toLowerCase()

			return {
				title,
				subtitle: count(items),
				media: t.includes('social')
					? IoShareSocialOutline
					: t.includes('header')
						? VscLayoutMenubar
						: t.includes('footer')
							? VscLayoutPanelLeft
							: null,
			}
		},
	},
})
