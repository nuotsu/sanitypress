import { defineField, defineType } from 'sanity'
import { VscEdit } from 'react-icons/vsc'
import { IoIosImage } from 'react-icons/io'

export default defineType({
	name: 'blog.post',
	title: 'Blog post',
	icon: VscEdit,
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'body',
			type: 'array',
			of: [
				{ type: 'block' },
				{
					type: 'image',
					icon: IoIosImage,
					fields: [
						defineField({
							name: 'alt',
							type: 'string',
						}),
						defineField({
							name: 'caption',
							type: 'text',
							rows: 2,
						}),
					],
				},
			],
		}),
		defineField({
			name: 'categories',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'blog.category' }],
				},
			],
		}),
		defineField({
			name: 'publishDate',
			type: 'date',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'publishDate',
			media: 'metadata.image',
		},
	},
	orderings: [
		{
			title: 'Date',
			name: 'date',
			by: [{ field: 'publishDate', direction: 'desc' }],
		},
		{
			title: 'Title',
			name: 'title',
			by: [{ field: 'title', direction: 'asc' }],
		},
	],
})
