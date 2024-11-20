import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { reputationBlock } from '../documents/reputation'
import {
	textAlign,
	alignItems,
	alignmentFieldset,
} from '../fragments/fields/alignment'
import { getBlockText } from '@/sanity/lib/utils'

export default defineType({
	name: 'hero',
	title: 'Hero',
	icon: TfiLayoutCtaCenter,
	type: 'object',
	groups: [
		{ name: 'content', default: true },
		{ name: 'image' },
		{ name: 'options' },
	],
	fieldsets: [alignmentFieldset, { name: 'image', options: { columns: 2 } }],
	fields: [
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
			name: 'bgImage',
			title: 'Background image',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: 'alt',
					type: 'string',
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
			group: 'image',
			fieldset: 'image',
		}),
		defineField({
			name: 'bgImageMobile',
			title: 'Background image (mobile)',
			type: 'image',
			options: {
				hotspot: true,
			},
			fields: [
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
			group: 'image',
			fieldset: 'image',
		}),
		defineField({
			...textAlign,
			fieldset: 'alignment',
		}),
		defineField({
			...alignItems,
			fieldset: 'alignment',
		}),
	],
	preview: {
		select: {
			content: 'content',
			media: 'bgImage.asset',
		},
		prepare: ({ content, media }) => ({
			title: getBlockText(content),
			subtitle: 'Hero',
			media,
		}),
	},
})
