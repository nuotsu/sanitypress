import { defineArrayMember, defineField } from 'sanity'
import { VscInspect } from 'react-icons/vsc'

export default defineArrayMember({
	name: 'ctas',
	title: 'Call-to-actions',
	icon: VscInspect,
	type: 'object',
	fields: [
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		}),
	],
	preview: {
		select: {
			ctas: 'ctas',
		},
		prepare: ({ ctas }) => ({
			title: `${ctas?.length || 0} CTAs`,
		}),
	},
})
