import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscStarFull, VscGithub } from 'react-icons/vsc'

const reputation = defineType({
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
			of: [
				{
					type: 'image',
					options: {
						hotspot: true,
					},
				},
			],
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
			avatar: 'avatars.0.asset',
		},
		prepare: ({ title, subtitle, repo, avatar }) => ({
			title: title || repo || '★★★★★',
			subtitle: subtitle || repo,
			media: repo ? VscGithub : avatar,
		}),
	},
})

export default reputation

export const reputationBlock = defineArrayMember({
	name: 'reputation-block',
	type: 'object',
	icon: VscStarFull,
	fields: [
		defineField({
			name: 'reputation',
			type: 'reference',
			to: [{ type: 'reputation' }],
		}),
	],
	preview: {
		select: {
			title: 'reputation.title',
			subtitle: 'reputation.subtitle',
			repo: 'reputation.repo',
		},
		prepare: reputation.preview?.prepare,
	},
})
