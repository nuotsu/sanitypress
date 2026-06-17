import { defineField } from 'sanity'
import { EditIcon } from '@sanity/icons'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'blog-post-content',
	title: 'Blog post content',
	type: 'object',
	icon: EditIcon,
	groups: [{ name: 'sidebar', default: true }],
	fields: [
		defineField({
			name: 'sidebar',
			type: 'sidebar',
			group: 'sidebar',
		}),
	],
	preview: {
		select: {
			uid: 'attributes.uid',
		},
		prepare: ({ uid }) => ({
			title: 'Blog post content',
			subtitle: uid && `#${uid}`,
		}),
	},
})
