import { defineArrayMember, defineField, defineType } from 'sanity'
import { ThListIcon } from '@sanity/icons/ThList'

export default defineType({
	name: 'table',
	title: 'Table',
	type: 'object',
	icon: ThListIcon,
	fields: [
		defineField({
			name: 'headerRows',
			type: 'number',
			initialValue: 1,
			hidden: true,
		}),
		defineField({
			name: 'rows',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'row',
					fields: [
						defineField({
							name: 'cells',
							type: 'array',
							of: [
								defineArrayMember({
									type: 'object',
									name: 'cell',
									fields: [
										defineField({
											name: 'value',
											type: 'array',
											of: [defineArrayMember({ type: 'block' })],
										}),
									],
								}),
							],
						}),
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			rows: 'rows',
		},
		prepare: ({ rows }) => {
			const rowCount = rows?.length ?? 0
			const colCount = rows?.[0]?.cells?.length ?? 0
			return {
				title: 'Table',
				subtitle:
					rowCount || colCount
						? `${rowCount} × ${colCount}`
						: 'Empty table',
			}
		},
	},
})
