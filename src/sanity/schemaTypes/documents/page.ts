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
			name: 'parent',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'page' }] }],
			group: 'metadata',
			options: {
				documentInternationalization: {
					exclude: true,
				},
			},
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
			parent1: 'parent.0.metadata.slug.current',
			parent2: 'parent.1.metadata.slug.current',
			parent3: 'parent.2.metadata.slug.current',
			slug: 'metadata.slug.current',
			media: 'metadata.image',
			noindex: 'metadata.noIndex',
			language: 'language',
		},
		prepare: ({
			title,
			parent1,
			parent2,
			parent3,
			slug,
			media,
			noindex,
			language,
		}) => ({
			title,
			subtitle: [
				language && `[${language}] `,
				parent1 && `/${[parent1, parent2, parent3].filter(Boolean).join('/')}`,
				slug && (slug === 'index' ? '/' : `/${slug}`),
			]
				.filter(Boolean)
				.join(''),
			media:
				media ||
				(slug === 'index' && VscHome) ||
				(slug === '404' && VscQuestion) ||
				(slug === 'search' && VscSearch) ||
				(slug === 'blog' && VscEdit) ||
				(slug.startsWith('docs') && VscMortarBoard) ||
				(noindex && VscEyeClosed),
		}),
	},
})
