'use client'

import { useState } from 'react'
import { defineField, defineType } from 'sanity'
import { Box, Button, Flex, Text, TextInput } from '@sanity/ui'
import { VscCheck, VscCopy } from 'react-icons/vsc'

export default defineType({
	name: 'module-options',
	title: 'Module options',
	type: 'object',
	fields: [
		defineField({
			name: 'hidden',
			type: 'boolean',
			description: 'Hide the module from the page',
			initialValue: false,
		}),
		defineField({
			name: 'uid',
			title: 'Unique identifier',
			description: 'Used for anchor/jump links (HTML `id` attribute).',
			type: 'string',
			validation: (Rule) =>
				Rule.regex(/^[a-zA-Z0-9-]+$/g).error(
					'Must not contain spaces or special characters',
				),
			components: {
				input: ({ elementProps, path }) => {
					const indexOfModule = path.indexOf('modules')
					const moduleKey = (path[indexOfModule + 1] as any)?._key
					const [checked, setChecked] = useState(false)

					return (
						<Flex gap={1} align="center">
							<Text muted>#</Text>

							<Box flex={1}>
								<TextInput
									{...elementProps}
									placeholder={moduleKey}
									radius={2}
								/>
							</Box>

							<Button
								title="Click to copy"
								mode="ghost"
								icon={checked ? VscCheck : VscCopy}
								disabled={checked}
								onClick={() => {
									navigator.clipboard.writeText(
										'#' + (elementProps.value || moduleKey),
									)

									setChecked(true)
									setTimeout(() => setChecked(false), 1000)
								}}
							/>
						</Flex>
					)
				},
			},
		}),
	],
})
