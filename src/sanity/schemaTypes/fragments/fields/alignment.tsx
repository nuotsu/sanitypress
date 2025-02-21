import TextInputWithPresets from '@/sanity/ui/TextInputWithPresets'
import { defineField, type FieldsetDefinition } from 'sanity'
import {
	MdVerticalAlignTop,
	MdVerticalAlignBottom,
	MdVerticalAlignCenter,
	MdVerticalDistribute,
	MdFormatAlignLeft,
	MdFormatAlignCenter,
	MdFormatAlignRight,
	MdFormatAlignJustify,
} from 'react-icons/md'

export const alignmentFieldset: FieldsetDefinition = {
	name: 'alignment',
	title: 'Alignment',
	options: { columns: 2 },
}

export const alignItems = defineField({
	name: 'alignItems',
	title: 'Vertical alignment',
	type: 'string',
	components: {
		input: (props) => (
			<TextInputWithPresets
				presets={[
					{ value: 'start', icon: MdVerticalAlignTop },
					{ value: 'center', icon: MdVerticalAlignCenter },
					{ value: 'end', icon: MdVerticalAlignBottom },
					{ value: 'stretch', icon: MdVerticalDistribute },
				]}
				{...props}
			/>
		),
	},
	initialValue: 'center',
	group: 'options',
})

export const textAlign = defineField({
	name: 'textAlign',
	title: 'Text alignment',
	type: 'string',
	components: {
		input: (props) => (
			<TextInputWithPresets
				presets={[
					{ value: 'left', icon: MdFormatAlignLeft },
					{ value: 'center', icon: MdFormatAlignCenter },
					{ value: 'right', icon: MdFormatAlignRight },
					{ value: 'justify', icon: MdFormatAlignJustify },
				]}
				{...props}
			/>
		),
	},
	initialValue: 'center',
	group: 'options',
})
