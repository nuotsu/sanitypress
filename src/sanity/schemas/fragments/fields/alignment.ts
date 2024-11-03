import { type FieldDefinition, type FieldsetDefinition } from 'sanity'

export const alignmentFieldset: FieldsetDefinition = {
	name: 'alignment',
	title: 'Alignment',
	options: { columns: 2 },
}

export const textAlign: FieldDefinition = {
	name: 'textAlign',
	type: 'string',
	options: {
		layout: 'radio',
		list: ['left', 'center', 'right'],
	},
	initialValue: 'center',
	group: 'options',
}

export const alignItems: FieldDefinition = {
	name: 'alignItems',
	title: 'Vertical alignment',
	type: 'string',
	options: {
		layout: 'radio',
		list: [
			{ title: 'Top', value: 'start' },
			'center',
			{ title: 'Bottom', value: 'end' },
		],
	},
	initialValue: 'center',
	group: 'options',
}
