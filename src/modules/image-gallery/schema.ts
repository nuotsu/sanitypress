import { defineArrayMember, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons/Images'
import { count, getBlockText } from '@/lib/utils'
import defineModule from '@/sanity/schemaTypes/fragments/define-module'

export default defineModule({
	name: 'image-gallery',
	title: 'Image gallery',
	type: 'object',
	icon: ImagesIcon,
	groups: [{ name: 'content', default: true }, { name: 'options' }],
	fields: [
		defineField({
			name: 'eyebrow',
			type: 'string',
			group: 'content',
		}),
		defineField({
			name: 'intro',
			type: 'array',
			of: [{ type: 'block' }],
			group: 'content',
		}),
		defineField({
			name: 'rows',
			type: 'array',
			of: [
				defineArrayMember({
					name: 'row',
					type: 'object',
					fields: [
						defineField({
							name: 'images',
							type: 'array',
							of: [
								defineArrayMember({
									type: 'image',
									options: {
										hotspot: true,
										metadata: ['lqip'],
									},
									fields: [
										defineField({
											name: 'alt',
											type: 'string',
										}),
										defineField({
											name: 'caption',
											type: 'string',
										}),
									],
								}),
							],
						}),
					],
					preview: {
						select: { images: 'images' },
						prepare: ({ images }) => ({
							title: count(images, 'image'),
							subtitle: 'Row',
							media: images?.[0],
						}),
					},
				}),
			],
			group: 'content',
		}),
		defineField({
			name: 'autoScroll',
			type: 'boolean',
			initialValue: true,
			group: 'options',
		}),
		defineField({
			name: 'duration',
			type: 'number',
			description: 'Duration in seconds for a complete cycle',
			initialValue: 20,
			hidden: ({ parent }) => !parent?.autoScroll,
			group: 'options',
		}),
		defineField({
			name: 'alternateScrollDirection',
			title: 'Alternate Scroll Direction',
			type: 'boolean',
			initialValue: true,
			hidden: ({ parent }) => !parent?.autoScroll,
			group: 'options',
		}),
	],
	preview: {
		select: {
			intro: 'intro',
			rows: 'rows',
		},
		prepare: ({ intro, rows }) => ({
			title: getBlockText(intro) || count(rows, 'row'),
			subtitle: 'Image gallery',
		}),
	},
})
