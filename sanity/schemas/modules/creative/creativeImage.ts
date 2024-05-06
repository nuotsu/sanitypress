import { defineArrayMember, defineField } from 'sanity'
import { IoIosImage } from 'react-icons/io'

export default defineArrayMember({
	name: 'image',
	icon: IoIosImage,
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
			name: 'aspectRatio',
			type: 'string',
		}),
	],
})
