import { defineField } from 'sanity'
import { EditIcon } from '@sanity/icons/Edit'
import { count, getBlockText } from '@/lib/utils'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'blog-index',
	title: 'Blog index',
	type: 'object',
	icon: EditIcon,
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'featured',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'blog.post' }] }],
			group: 'content',
		}),
		defineField({
			name: 'postsPerPage',
			type: 'number',
			initialValue: 6,
			validation: (Rule) => Rule.min(1),
			group: 'options',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			featured: 'featured',
		},
		prepare: ({ intro, featured }) => ({
			title: getBlockText(intro),
			subtitle: [
				'Blog index',
				featured?.length && `(${count(featured, 'featured post')})`,
			]
				.filter(Boolean)
				.join(' '),
		}),
	},
})
