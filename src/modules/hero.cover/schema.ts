import { defineField } from 'sanity'
import { TfiLayoutMediaOverlay } from 'react-icons/tfi'
import { getBlockText } from '@/lib/utils'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'hero.cover',
	title: 'Hero (cover)',
	type: 'object',
	icon: TfiLayoutMediaOverlay,
	groups: [
		{ name: 'content', default: true },
		{ name: 'image' },
		{ name: 'options' },
	],
	fieldsets: [
		{ name: 'alignment', options: { columns: 2 } },
	],
	fields: [
		defineField({
			name: 'eyebrow',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'content',
			type: 'array',
			of: [{ type: 'block' }, { type: 'custom-html' }],
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
				metadata: ['lqip'],
			},
			fieldsets: [{ name: 'options', options: { columns: 2 } }],
			fields: [
				defineField({
					name: 'mobile',
					type: 'image',
					options: {
						hotspot: true,
						metadata: ['lqip'],
					},
				}),
				defineField({
					name: 'opacity',
					type: 'number',
					fieldset: 'options',
					validation: (Rule) => Rule.min(0).max(1),
					initialValue: 1,
					placeholder: 'e.g. 0.5, 1, etc',
				}),
				defineField({
					name: 'alt',
					type: 'string',
					fieldset: 'options',
				}),
				defineField({
					name: 'loading',
					type: 'string',
					options: {
						list: ['lazy', 'eager'],
						layout: 'radio',
					},
					initialValue: 'lazy',
					fieldset: 'options',
				}),
			],
			group: 'image',
		}),
		defineField({
			name: 'verticalAlign',
			type: 'string',
			options: {
				list: ['top', 'center', 'bottom'],
			},
			initialValue: 'center',
			fieldset: 'alignment',
			group: 'options',
		}),
		defineField({
			name: 'textAlign',
			type: 'string',
			options: {
				list: ['left', 'center', 'right'],
			},
			initialValue: 'center',
			fieldset: 'alignment',
			group: 'options',
		}),
	],
	preview: {
		select: {
			content: 'content',
			image: 'image',
		},
		prepare: ({ content, image }) => ({
			title: getBlockText(content),
			subtitle: 'Hero (cover)',
			media: image,
		}),
	},
})
