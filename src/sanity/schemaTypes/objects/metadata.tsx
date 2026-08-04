import { defineField, defineType } from 'sanity'
import CharacterCount from '@/sanity/ui/character-count'

export default defineType({
	name: 'metadata',
	title: 'Metadata',
	type: 'object',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.max(60).warning(),
			components: {
				input: (props) => <CharacterCount max={60} {...props} />,
			},
		}),
		defineField({
			name: 'description',
			type: 'text',
			validation: (Rule) => Rule.max(160).warning(),
			components: {
				input: (props) => <CharacterCount as="textarea" max={160} {...props} />,
			},
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			description: 'URL path or permalink',
			options: {
				source: (doc: any) => doc.title || doc.metadata.title,
			},
			validation: (Rule) => [
				Rule.required(),
				Rule.custom((slug, context) => {
					if (context.document?._type !== 'page') return true
					if (slug?.current === 'index') {
						return 'This page will show at / (Homepage)'
					}
					return true
				}).info(),
			],
		}),
		defineField({
			name: 'image',
			description: 'Used for social sharing previews',
			type: 'image',
			options: {
				hotspot: true,
				metadata: ['lqip'],
			},
		}),
		defineField({
			name: 'noIndex',
			description: 'Prevent search engines from indexing this page',
			type: 'boolean',
			initialValue: false,
		}),
	],
})
