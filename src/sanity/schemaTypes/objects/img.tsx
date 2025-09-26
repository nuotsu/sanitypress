import { defineArrayMember, defineField, defineType } from 'sanity'
import { VscFileMedia } from 'react-icons/vsc'
import {
	getPreset,
	TextInputWithPresets,
	type Preset,
} from '@/sanity/ui/TextInputWithPresets'
import { count } from '@/lib/utils'

const presets: Preset[] = [
	{ title: 'Tablet and below', value: '(width < 48rem)' },
	{ title: 'Mobile only', value: '(width < 24rem)' },
	{ title: 'Dark mode', value: '(prefers-color-scheme: dark)' },
]

export default defineType({
	name: 'img',
	title: 'Image',
	type: 'object',
	icon: VscFileMedia,
	fieldsets: [{ name: 'options', options: { columns: 2 } }],
	fields: [
		defineField({
			name: 'image',
			title: 'Default image',
			type: 'image',
			options: {
				hotspot: true,
				metadata: ['lqip'],
			},
		}),
		defineField({
			name: 'responsive',
			title: 'Responsive images',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'responsive',
					fields: [
						defineField({
							name: 'image',
							type: 'image',
							options: {
								hotspot: true,
							},
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'media',
							title: 'Media query',
							type: 'string',
							placeholder: `e.g. ${presets.map((p) => getPreset(p)).join(', ')}`,
							validation: (Rule) => Rule.required(),
							initialValue: getPreset(presets[0]),
							components: {
								input: (props) => (
									<TextInputWithPresets
										prefix="@media"
										presets={presets}
										{...(props as any)}
									/>
								),
							},
						}),
					],
					preview: {
						select: {
							title: 'media',
							media: 'image',
						},
					},
				}),
			],
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
	preview: {
		select: {
			image: 'image',
			responsive: 'responsive',
			alt: 'alt',
			loading: 'loading',
		},
		prepare: ({ image, responsive, alt, loading = 'lazy' }) => ({
			title: alt,
			subtitle: [
				responsive && count(responsive, 'responsive image'),
				loading && `loading="${loading}"`,
			]
				.filter(Boolean)
				.join(', '),
			media: image,
		}),
	},
})
