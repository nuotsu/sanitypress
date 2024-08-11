import { defineField, defineType } from 'sanity'
import { VscStarFull } from 'react-icons/vsc'

export default defineType({
	name: 'reputation',
	title: 'Reputation',
	icon: VscStarFull,
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			description: 'Defaults to "★★★★★"',
		}),
		defineField({
			name: 'subtitle',
			type: 'string',
		}),
		defineField({
			name: 'repo',
			title: 'GitHub Repo',
			type: 'string',
			description: 'Retrieves stargazer count and avatar images from GitHub',
			placeholder: 'e.g. nuotsu/sanitypress',
		}),
		defineField({
			name: 'limit',
			title: 'Avatar limit',
			type: 'number',
			description: 'Defaults to 5',
			initialValue: 5,
			validation: (Rule) => Rule.min(1).max(10),
		}),
		defineField({
			name: 'avatars',
			type: 'array',
			of: [{ type: 'image' }],
			options: {
				layout: 'grid',
			},
			validation: (Rule) => Rule.max(10),
		}),
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'subtitle',
			repo: 'repo',
		},
		prepare: ({ title, subtitle, repo }) => ({
			title: title || repo || '★★★★★',
			subtitle: subtitle || repo,
		}),
	},
})
