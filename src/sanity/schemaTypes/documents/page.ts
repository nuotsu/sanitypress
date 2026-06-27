import { defineField, defineType } from 'sanity'
import { EditIcon, ErrorScreenIcon, HomeIcon, SearchIcon } from '@sanity/icons'
import { VscEyeClosed } from 'react-icons/vsc'
import modules from '../fragments/modules'

export default defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
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
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			...modules(),
			group: 'content',
		}),
		defineField({
			name: 'markdown',
			type: 'code',
			description:
				'Served at <slug>.md; When empty, no .md route is generated.',
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
			slug: 'metadata.slug.current',
			noIndex: 'metadata.noIndex',
		},
		prepare: ({ title, slug, noIndex }) => ({
			title,
			subtitle: `/${slug === 'index' ? '' : slug}`,
			media:
				(slug === 'index' && HomeIcon) ||
				(slug === '404' && ErrorScreenIcon) ||
				(slug === 'search' && SearchIcon) ||
				(slug === 'blog' && EditIcon) ||
				(noIndex && VscEyeClosed),
		}),
	},
})
