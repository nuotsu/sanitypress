import { defineArrayMember, defineField, defineType } from 'sanity'
import { InsertAboveIcon, InsertBelowIcon } from '@sanity/icons'
import { VscSymbolField } from 'react-icons/vsc'
import { count } from '@/lib/utils'
import modules from '../fragments/modules'

export default defineType({
	name: 'global-module',
	title: 'Global module',
	type: 'document',
	icon: VscSymbolField,
	fieldsets: [
		{
			name: 'path',
			description:
				'Use "*" to target all pages. A trailing slash ".../" excludes the parent path.',
			options: { columns: 2 },
		},
	],
	fields: [
		defineField({
			name: 'path',
			title: 'Target path',
			type: 'string',
			placeholder: 'e.g. *, foo/bar, blog/, etc.',
			validation: (Rule) => Rule.regex(/^(\*|[a-z0-9-_/]+\/?)$/),
			fieldset: 'path',
		}),
		defineField({
			name: 'excludePaths',
			title: 'Paths to exclude',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'string',
					placeholder: 'e.g. foo/bar, blog/, etc.',
					validation: (Rule) => Rule.required(),
				}),
			],
			fieldset: 'path',
		}),
		defineField({
			...modules({
				of: [{ type: 'blog-post-content' }],
			}),
			name: 'before',
			description: 'Added before all page modules',
		}),
		defineField({
			...modules({
				of: [{ type: 'blog-post-content' }],
			}),
			name: 'after',
			description: 'Added after all page modules',
		}),
	],
	preview: {
		select: {
			path: 'path',
			before: 'before',
			after: 'after',
		},
		prepare: ({ path, before, after }) => ({
			title: count([...(before ?? []), ...(after ?? [])], 'global module'),
			subtitle: path,
			media: after ? InsertBelowIcon : InsertAboveIcon,
		}),
	},
})
