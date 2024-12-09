import { defineField, defineType } from 'sanity'
import { ImNewspaper } from 'react-icons/im'

export default defineType({
	name: 'blog-frontpage',
	title: 'Blog frontpage',
	icon: ImNewspaper,
	type: 'object',
	fields: [
		defineField({
			name: 'mainPost',
			description: 'Choose which post to display as the main post',
			type: 'string',
			options: {
				list: [
					{ title: 'Most recent post', value: 'recent' },
					{ title: 'Featured post', value: 'featured' },
				],
				layout: 'radio',
			},
		}),
		defineField({
			name: 'showFeaturedPostsFirst',
			description: 'In the list below the main post',
			type: 'boolean',
			initialValue: true,
		}),
		defineField({
			name: 'itemsPerPage',
			type: 'number',
			initialValue: 6,
			validation: (Rule) => Rule.required().min(1),
		}),
	],
	preview: {
		select: {
			mainPost: 'mainPost',
		},
		prepare: ({ mainPost }) => ({
			title: 'Blog frontpage',
			subtitle: `Main post: ${mainPost}`,
		}),
	},
})
