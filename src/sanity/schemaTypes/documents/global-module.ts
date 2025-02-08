import { defineField, defineType } from 'sanity'
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
			...modules,
			description: 'Modules to add at the bottom of the pages',
		}),
	],
	preview: {
		select: {
			path: 'path',
			modules: 'modules',
		},
		prepare: ({ path, modules }) => ({
			title: count(modules, 'module'),
			subtitle: path === '*' ? 'All pages' : path && `/${path}`,
		}),
	},
})
