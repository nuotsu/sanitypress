import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscStarFull, VscGithub } from 'react-icons/vsc'

const reputation = defineType({
	name: 'reputation',
	title: 'Reputation',
	icon: VscStarFull,
	type: 'document',
	fieldsets: [
		{ name: 'github', title: 'GitHub', options: { columns: 2 } },
		{ name: 'avatars' },
	],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			description:
				'Defaults to "★★★★★". Leave empty to show repo stargazers count (if set).',
			placeholder: '★★★★★',
		}),
		defineField({
			name: 'subtitle',
			type: 'string',
		}),
		defineField({
			name: 'repo',
			title: 'GitHub Repo',
			type: 'string',
			description: 'Retrieves stargazers/forks and avatars from GitHub',
			placeholder: 'owner/repo',
			validation: (Rule) => Rule.regex(/^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/),
			fieldset: 'github',
		}),
		defineField({
			name: 'showForks',
			title: 'Show forks count',
			type: 'boolean',
			initialValue: false,
			hidden: ({ parent }) => !parent?.repo,
			fieldset: 'github',
		}),
		defineField({
			name: 'limit',
			title: 'Avatar limit',
			type: 'number',
			description: 'Defaults to 5',
			initialValue: 5,
			validation: (Rule) => Rule.min(1).max(10),
			fieldset: 'avatars',
		}),
		defineField({
			name: 'avatars',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'image',
					fields: [
						defineField({
							name: 'alt',
							type: 'string',
						}),
					],
					options: {
						hotspot: true,
					},
				}),
			],
			options: {
				layout: 'grid',
			},
			validation: (Rule) => Rule.max(10),
			fieldset: 'avatars',
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
