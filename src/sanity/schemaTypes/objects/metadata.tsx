import { defineField, defineType } from 'sanity'
import { CharacterCount } from '@/sanity/ui/CharacterCount'
import PreviewOG from '@/sanity/ui/PreviewOG'

export default defineType({
	name: 'metadata',
	title: 'Metadata',
	description: 'For search engines',
	type: 'object',
	fields: [
		defineField({
			name: 'slug',
			type: 'slug',
			description: 'URL path or permalink',
			options: {
				source: (doc: any) => doc.title || doc.metadata.title,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.max(60).warning(),
			components: {
				input: (props) => (
					<CharacterCount max={60} {...(props as any)}>
						<PreviewOG title={props.elementProps.value} />
					</CharacterCount>
				),
			},
		}),
		defineField({
			name: 'description',
			type: 'text',
			validation: (Rule) => Rule.max(160).warning(),
			components: {
				input: (props) => (
					<CharacterCount as="textarea" max={160} {...(props as any)} />
				),
			},
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
