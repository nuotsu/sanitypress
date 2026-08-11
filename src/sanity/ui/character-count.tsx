import type { StringInputProps, StringSchemaType } from 'sanity'
import { Flex, Stack, Text, TextArea, TextInput } from '@sanity/ui'
import React from 'react'

export default function ({
	elementProps,
	as = 'input',
	max,
	children,
}: {
	as?: 'input' | 'textarea'
	max: number
	children?: React.ReactNode
} & StringInputProps<StringSchemaType>) {
	const chars = elementProps.value?.length || 0
	const Input = as === 'textarea' ? TextArea : TextInput

	return (
		<Stack gap={2}>
			<Input
				{...elementProps}
				style={as === 'textarea' ? { resize: 'block', height: '4lh' } : {}}
			/>
			<Flex>
				{children}

				<Text style={{ flexGrow: 1, textAlign: 'end' }} size={1} muted>
					<span
						style={{
							color:
								chars > max
									? 'var(--card-badge-caution-icon-color)'
									: 'var(--card-success)',
						}}
					>
						{chars}
					</span>
					/{max}
				</Text>
			</Flex>
		</Stack>
	)
}
