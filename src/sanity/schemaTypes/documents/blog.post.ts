import { defineArrayMember, defineField, defineType } from 'sanity'
import { EditIcon } from '@sanity/icons/Edit'
import { ImageIcon } from '@sanity/icons/Image'

export default defineType({
	name: 'blog.post',
	title: 'Blog post',
	type: 'document',
	icon: EditIcon,
	groups: [
		{ name: 'content', default: true },
		{ name: 'markdown' },
		{ name: 'metadata' },
	],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [
				{ type: 'block' },
				defineArrayMember({
					type: 'image',
					icon: ImageIcon,
					options: {
						hotspot: true,
						metadata: ['lqip'],
					},
					fields: [
						defineField({
							name: 'alt',
							type: 'string',
						}),
						defineField({
							name: 'figcaption',
							type: 'array',
							of: [
								{
									type: 'block',
									styles: [{ title: 'Normal', value: 'normal' }],
								},
							],
						}),
					],
				}),
				defineArrayMember({
					type: 'code',
					title: 'Code block',
					options: {
						withFilename: true,
					},
				}),
				{ type: 'custom-html' },
			],
			group: 'content',
		}),
		defineField({
			name: 'publishDate',
			type: 'date',
			group: 'content',
		}),
		defineField({
			name: 'categories',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'blog.category' }] }],
			group: 'content',
		}),
		defineField({
			name: 'author',
			type: 'reference',
			to: [{ type: 'person' }],
			group: 'content',
		}),
		defineField({
			name: 'markdown',
			type: 'code',
			description:
				'Served at <slug>.md; Leave empty to disable route generation.',
			options: {
				language: 'markdown',
				languageAlternatives: [{ title: 'Markdown', value: 'markdown' }],
			},
			group: 'markdown',
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
			group: 'metadata',
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
			name: 'publishDate',
			title: 'Publish date',
			by: [{ field: 'publishDate', direction: 'desc' }],
		},
		{
			name: 'title',
			title: 'Title',
			by: [{ field: 'title', direction: 'asc' }],
		},
	],
})
