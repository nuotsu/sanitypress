import { defineArrayMember, defineField } from 'sanity'
import { VscInfo, VscLightbulb, VscReport, VscWarning } from 'react-icons/vsc'
import { getBlockText } from '@/lib/utils'

export default defineArrayMember({
	name: 'admonition',
	type: 'object',
	icon: VscReport,
	fields: [
		defineField({
			name: 'tone',
			type: 'string',
			options: {
				list: [
					{ title: '🔵 Note', value: 'note' },
					{ title: '🟣 Important', value: 'important' },
					{ title: '🟢 Tip', value: 'tip' },
					{ title: '🟠 Warning', value: 'warning' },
					{ title: '🔴 Caution', value: 'caution' },
				],
			},
			initialValue: 'note',
		}),
		defineField({
			name: 'title',
			type: 'string',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
		}),
	],
	preview: {
		select: {
			title: 'title',
			content: 'content',
			tone: 'tone',
		},
		prepare: ({ title, content, tone }) => ({
			title,
			subtitle: getBlockText(content),
			media:
				tone === 'note' ? (
					<VscInfo />
				) : tone === 'important' ? (
					<VscReport />
				) : tone === 'tip' ? (
					<VscLightbulb />
				) : tone === 'warning' || tone === 'caution' ? (
					<VscWarning />
				) : null,
		}),
	},
})
