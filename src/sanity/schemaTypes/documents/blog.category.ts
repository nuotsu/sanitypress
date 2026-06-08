import { defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export default defineType({
	name: 'blog.category',
	title: 'Blog category',
	type: 'document',
	icon: TagIcon,
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: { source: 'title' },
		}),
	],
	preview: {
		select: {
			title: 'title',
		},
	},
})
