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
			type: 'slug',
			description: 'The path to add modules. eg. * (all pages), docs/*, etc.',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			...modules,
			description: 'Modules to add at the bottom of the pages',
		}),
	],
	preview: {
		select: {
			path: 'path.current',
			modules: 'modules',
		},
		prepare: ({ path, modules }) => ({
			title: count(modules, 'module'),
			subtitle: path === '*' ? 'All pages' : path && `/${path}`,
		}),
	},
})
