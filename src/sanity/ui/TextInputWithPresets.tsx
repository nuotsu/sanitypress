'use client'

import { useState } from 'react'
import { Badge, Card, Flex, Stack, Text, TextInput } from '@sanity/ui'
import type { StringInputProps, StringSchemaType } from 'sanity'

export type Preset =
	| string
	| {
			label: string
			value: string
	  }

export function getPreset(
	preset: Preset,
	property: 'label' | 'value' = 'value',
) {
	if (typeof preset === 'string') {
		return preset
	}

	return preset[property]
}

export default function TextInputWithPresets({
	elementProps,
	prefix,
	suffix,
	presets,
}: {
	prefix?: string
	suffix?: string
	presets?: Preset[]
} & StringInputProps<StringSchemaType>) {
	const [value, setValue] = useState(elementProps.value)

	return (
		<Stack space={2}>
			<Flex align="center" gap={1}>
				{prefix && (
					<Text size={1} muted>
						{prefix}
					</Text>
				)}

				<Card flex={1}>
					<TextInput {...elementProps} value={value} />
				</Card>

				{suffix && (
					<Text size={1} muted>
						{suffix}
					</Text>
				)}
			</Flex>

			{presets && (
				<Flex gap={1} paddingLeft={prefix ? prefix.length : undefined}>
					{presets?.map((preset) => {
						const presetValue = getPreset(preset)
						const label = getPreset(preset, 'label')

						return (
							<Badge
								style={{ cursor: 'pointer' }}
								padding={2}
								tone={presetValue === value ? 'primary' : 'default'}
								onClick={() => setValue(presetValue)}
								key={presetValue}
							>
								{label}
							</Badge>
						)
					})}
				</Flex>
			)}
		</Stack>
	)
}
