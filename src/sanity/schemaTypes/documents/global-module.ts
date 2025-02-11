import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscSymbolField } from 'react-icons/vsc'
import modules from '../fragments/modules'
import { count } from '@/lib/utils'

export default defineType({
	name: 'global-module',
	title: 'Global module',
	type: 'document',
	icon: VscSymbolField,
	fields: [
		defineField({
			name: 'path',
			type: 'string',
			description: 'The path to add modules',
			placeholder: 'e.g. * (all pages), docs/*, etc.',
			validation: (Rule) =>
				Rule.required().regex(/\*$/).error('Must end with a *'),
		}),
		defineField({
			name: 'excludePaths',
			type: 'array',
			description: 'The paths to exclude from modules being added',
			of: [
				defineArrayMember({
					type: 'string',
					placeholder: 'e.g. * (all pages), docs/*, etc.',
					validation: (Rule) => Rule.required(),
				}),
			],
		}),
		defineField({
			...modules,
			name: 'before',
			description: 'Modules to add before the page content',
		}),
		defineField({
			...modules,
			name: 'after',
			description: 'Modules to add after the page content',
		}),
	],
	preview: {
		select: {
			path: 'path',
			before: 'before',
			after: 'after',
		},
		prepare: ({ path, before = [], after = [] }) => ({
			title: count([...before, ...after], 'module'),
			subtitle: path === '*' ? 'All pages' : path && `/${path}`,
		}),
	},
})
