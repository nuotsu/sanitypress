import { defineField, defineType } from 'sanity'
import modules from '../fragments/modules'
import {
	VscHome,
	VscQuestion,
	VscEyeClosed,
	VscSearch,
	VscEdit,
	VscMortarBoard,
} from 'react-icons/vsc'
import { BLOG_DIR } from '@/lib/env'

export default defineType({
	name: 'page',
	title: 'Page',
	type: 'document',
	groups: [{ name: 'content', default: true }, { name: 'metadata' }],
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			group: 'content',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			...modules,
			group: 'content',
		}),
		defineField({
			name: 'metadata',
			type: 'metadata',
			group: 'metadata',
		}),
		defineField({
			name: 'language',
			type: 'string',
			readOnly: true,
			hidden: true,
		}),
	],
	preview: {
		select: {
			title: 'title',
			slug: 'metadata.slug.current',
			media: 'metadata.image',
			noindex: 'metadata.noIndex',
			language: 'language',
		},
		prepare: ({ title, slug, media, noindex, language }) => ({
			title,
			subtitle: [
				language && `[${language}] `,
				slug && (slug === 'index' ? '/' : `/${slug}`),
			]
				.filter(Boolean)
				.join(''),
			media:
				media ||
				(slug === 'index' && VscHome) ||
				(slug === '404' && VscQuestion) ||
				(slug === 'search' && VscSearch) ||
				(slug === BLOG_DIR && VscEdit) ||
				(slug.startsWith('docs') && VscMortarBoard) ||
				(noindex && VscEyeClosed),
		}),
	},
})
