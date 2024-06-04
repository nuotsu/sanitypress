import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscEdit } from 'react-icons/vsc'
import { IoIosImage } from 'react-icons/io'

export default defineType({
	name: 'blog.post',
	title: 'Blog post',
	icon: VscEdit,
	type: 'document',
	fields: [
		defineField({
			name: 'body',
			type: 'array',
			of: [
				{ type: 'block' },
				defineArrayMember({
					type: 'image',
					icon: IoIosImage,
					options: {
						hotspot: true,
					},
					fields: [
						defineField({
							name: 'caption',
							type: 'text',
							rows: 2,
						}),
						defineField({
							name: 'alt',
							type: 'string',
						}),
						defineField({
							name: 'loading',
							type: 'string',
							options: {
								list: ['lazy', 'eager'],
							},
							initialValue: 'lazy',
						}),
					],
					preview: {
						select: {
							title: 'caption',
							subtitle: 'alt',
							media: 'asset',
						},
					},
				}),
				{ type: 'code-block' },
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
			title: 'metadata.title',
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
			name: 'metadata.title',
			by: [{ field: 'title', direction: 'asc' }],
		},
	],
})
