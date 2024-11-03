import { defineField, defineType } from 'sanity'
import { VscInspect } from 'react-icons/vsc'

export default defineType({
	name: 'cta',
	title: 'Call-to-action',
	icon: VscInspect,
	type: 'object',
	fields: [
		defineField({
			name: 'link',
			type: 'link',
		}),
		defineField({
			name: 'style',
			type: 'string',
			options: {
				list: [
					'action',
					{ title: 'Outline', value: 'action-outline' },
					'ghost',
					'link',
				],
			},
		}),
	],
	preview: {
		select: {
			label: 'link.label',
			pageTitle: 'link.internal.title',
			internal: 'link.internal.metadata.slug.current',
			external: 'link.external',
		},
		prepare: ({ label, pageTitle, internal, external }) => ({
			title: label || pageTitle,
			subtitle:
				external || (internal && (internal === 'index' ? '/' : `/${internal}`)),
		}),
	},
})
