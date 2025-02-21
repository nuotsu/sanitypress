import { defineArrayMember, defineField } from 'sanity'
import { IoIosImage } from 'react-icons/io'
import TextInputWithPresets, {
	type Preset,
} from '@/sanity/ui/TextInputWithPresets'

const presets: Preset[] = [
	{ label: 'square', value: '1' },
	{ label: 'video', value: '16 / 9' },
	{ label: '2:1', value: '2' },
	{ label: '3:2', value: '1.5' },
	{ label: '4:3', value: '4 / 3' },
]

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
			components: {
				input: (props) => (
					<TextInputWithPresets prefix="W / H" presets={presets} {...props} />
				),
			},
		}),
	],
})
