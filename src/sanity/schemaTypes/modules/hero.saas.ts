import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { reputationBlock } from '../documents/reputation'
import { getBlockText } from '@/sanity/lib/utils'

export default defineType({
	name: 'hero.saas',
	title: 'Hero (SaaS)',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [
		{ name: 'content', default: true },
		{ name: 'image' },
		{ name: 'options' },
	],
	fields: [
		defineField({
			name: 'options',
			type: 'module-options',
			group: 'options',
		}),
		defineField({
			name: 'pretitle',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }, { type: 'custom-html' }, reputationBlock],
			group: 'content',
		}),
		defineField({
			name: 'ctas',
			title: 'Call-to-actions',
			type: 'array',
			of: [{ type: 'cta' }],
			group: 'content',
		}),
		defineField({
			name: 'image',
			type: 'image',
			options: {
				hotspot: true,
			},
			group: 'image',
			fields: [
				defineField({
					name: 'alt',
					type: 'string',
				}),
				defineField({
					name: 'faded',
					type: 'boolean',
					initialValue: true,
				}),
				defineField({
					name: 'loading',
					type: 'string',
					options: {
						list: ['lazy', 'eager'],
						layout: 'radio',
					},
					initialValue: 'lazy',
				}),
			],
		}),
	],
	preview: {
		select: {
			content: 'content',
			media: 'image',
		},
		prepare: ({ content, media }) => ({
			title: getBlockText(content),
			subtitle: 'Hero (SaaS)',
			media,
		}),
	},
})
