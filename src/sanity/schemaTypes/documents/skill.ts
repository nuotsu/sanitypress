import { defineField, defineType } from 'sanity'
import { VscEditSparkle } from 'react-icons/vsc'

export default defineType({
	name: 'skill',
	title: 'Skill',
	icon: VscEditSparkle,
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			type: 'slug',
			options: {
				source: 'title',
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'description',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'content',
			type: 'code',
			options: {
				language: 'markdown',
				languageAlternatives: [{ title: 'Markdown', value: 'markdown' }],
			},
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			name: 'name.current',
			description: 'description',
		},
		prepare: ({ name, description }) => ({
			title: `/${name}`,
			subtitle: description,
		}),
	},
})
