import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscEdit } from 'react-icons/vsc'
import imageBlock from '../fragments/image-block'

export default defineType({
	name: 'blog.post',
	title: 'Blog post',
	icon: VscEdit,
	type: 'document',
	groups: [
		{ name: 'content', default: true },
		{ name: 'options' },
		{ name: 'seo', title: 'SEO' },
	],
	fields: [
		defineField({
			name: 'body',
			type: 'array',
			of: [
				{ type: 'block' },
				imageBlock,
				defineArrayMember({
					type: 'code',
					options: {
						withFilename: true,
					},
				}),
				{ type: 'custom-html' },
			],
			group: 'content',
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
			group: 'content',
		}),
		defineField({
			name: 'authors',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'person' }],
				},
			],
			group: 'content',
		}),
		defineField({
			name: 'publishDate',
			type: 'date',
			validation: (Rule) => Rule.required(),
			group: 'content',
		}),
		defineField({
			name: 'featured',
			type: 'boolean',
			group: 'options',
			initialValue: false,
		}),
		defineField({
			name: 'hideTableOfContents',
			type: 'boolean',
			group: 'options',
			initialValue: false,
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
			group: 'seo',
		}),
	],
	preview: {
		select: {
			featured: 'featured',
			title: 'metadata.title',
			publishDate: 'publishDate',
			slug: 'metadata.slug.current',
			media: 'metadata.image',
		},
		prepare: ({ title, publishDate, slug, media, featured }) => ({
			title: [featured && '★', title].filter(Boolean).join(' '),
			subtitle: [publishDate || 'No date', slug && `/${slug}`]
				.filter(Boolean)
				.join(' — '),
			media,
		}),
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
