'use client'

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { Badge, Card, Flex, Stack, Text, TextInput } from '@sanity/ui'
import type { StringInputProps, StringSchemaType } from 'sanity'

export type Preset<T = string> =
	| T
	| {
			title?: string
			value: T
			icon?: React.ComponentType
	  }

export function getPreset(
	preset: Preset,
	property: 'title' | 'value' = 'value',
) {
	return typeof preset === 'string'
		? preset
		: (preset?.[property] ?? preset.value)
}

export function TextInputWithPresets({
	elementProps,
	prefix,
	suffix,
	presets,
}: {
	prefix?: string
	suffix?: string
	presets?: Preset[]
} & StringInputProps<StringSchemaType>) {
	const handleChange = useCallback(
		(value: string) => {
			elementProps.onChange({
				currentTarget: { value },
			} as FormEvent<HTMLInputElement>)
		},
		[elementProps.onChange],
	)

	const [prefixWidth, setPrefixWidth] = useState(0)
	const prefixRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!prefixRef.current) return
		setPrefixWidth(prefixRef.current.offsetWidth + 4)
	}, [])

	return (
		<Stack space={2}>
			<Flex align="center" gap={1}>
				{prefix && (
					<Text ref={prefixRef} size={1} muted>
						{prefix}
					</Text>
				)}

				<Card flex={1}>
					<TextInput
						{...elementProps}
						onChange={(e) => handleChange(e.currentTarget.value)}
					/>
				</Card>

				{suffix && (
					<Text size={1} muted>
						{suffix}
					</Text>
				)}
			</Flex>

			{presets && (
				<Flex gap={1} style={{ marginLeft: prefixWidth }} wrap="wrap">
					{presets?.map((preset) => {
						const presetValue = getPreset(preset)
						const label = getPreset(preset, 'title')

						return (
							<Badge
								style={{ cursor: 'pointer' }}
								padding={2}
								tone={
									presetValue === elementProps.value ? 'primary' : 'default'
								}
								onClick={() => handleChange(presetValue)}
								key={presetValue}
							>
								<Flex align="center" gap={1}>
									{typeof preset === 'object' && preset.icon && <preset.icon />}
									{label}
								</Flex>
							</Badge>
						)
					})}
				</Flex>
			)}
		</Stack>
	)
}
