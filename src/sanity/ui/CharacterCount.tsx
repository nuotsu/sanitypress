import { Stack, Text, TextInput, TextArea, Flex } from '@sanity/ui'
import type { StringInputProps, StringSchemaType } from 'sanity'

export default function CharacterCount({
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
		<Stack space={2}>
			<Input {...elementProps} />
			<Flex>
				{children}

				<Text style={{ flexGrow: 1, textAlign: 'right' }} size={1} muted>
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
