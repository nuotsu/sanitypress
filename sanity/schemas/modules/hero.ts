import { defineField, defineType } from 'sanity'
import { TfiLayoutCtaCenter } from 'react-icons/tfi'
import { getBlockText } from '@sanity/src/utils'
import {
	textAlign,
	alignItems,
	alignmentFieldset,
} from '../fragments/fields/alignment'

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
	fieldsets: [alignmentFieldset],
	fields: [
		defineField({
			name: 'pretitle',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }],
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
						layout: 'radio',
						list: ['lazy', 'eager'],
					},
					initialValue: 'lazy',
				}),
			],
			group: 'image',
		}),
		defineField({
			name: 'bgImageMobile',
			title: 'Background image (mobile)',
			type: 'image',
			options: {
				hotspot: true,
			},
			group: 'image',
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
			media: 'bgImage',
		},
		prepare: ({ content, media }) => ({
			title: getBlockText(content),
			subtitle: 'Hero',
			media,
		}),
	},
})
