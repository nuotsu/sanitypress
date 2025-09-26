import { defineArrayMember, defineField } from 'sanity'
import { IoIosImage } from 'react-icons/io'
import { TextInputWithPresets } from '@/sanity/ui/TextInputWithPresets'

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
					<TextInputWithPresets
						prefix="W / H"
						presets={[
							{ title: 'square', value: '1' },
							{ title: 'video', value: '16 / 9' },
							{ title: '2:1', value: '2' },
							{ title: '3:2', value: '1.5' },
							{ title: '4:3', value: '4 / 3' },
						]}
						{...(props as any)}
					/>
				),
			},
		}),
	],
})
