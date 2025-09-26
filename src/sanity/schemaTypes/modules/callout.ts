import { defineField, defineType } from 'sanity'
import { VscInspect } from 'react-icons/vsc'
import { reputationBlock } from '../misc/reputation'
import { getBlockText } from '@/lib/utils'

export default defineType({
	name: 'callout',
	title: 'Callout',
	icon: VscInspect,
	type: 'object',
	fields: [
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }, { type: 'code' }, reputationBlock],
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
		}),
	],
	preview: {
		select: {
			content: 'content',
		},
		prepare: ({ content }) => ({
			title: getBlockText(content),
			subtitle: 'Callout',
		}),
	},
})
