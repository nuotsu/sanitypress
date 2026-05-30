'use client'

import { defineField, defineType } from 'sanity'
import { Box, Button, Flex, Text, TextInput } from '@sanity/ui'
import { useState } from 'react'
import { VscCheck, VscCopy } from 'react-icons/vsc'

export default defineType({
	name: 'module-attributes',
	title: 'Module attributes',
	type: 'object',
	fields: [
		defineField({
			name: 'uid',
			title: 'Unique identifier',
			description: 'Useful for deep links (i.e. HTML `id` attribute)',
			type: 'string',
			validation: (Rule) =>
				Rule.regex(/^[a-zA-Z0-9-]+$/g).error(
					'Must not contain spaces or special characters',
				),
			components: {
				input: ({ elementProps, path }) => {
					const moduleKey = (path[1] as any)?._key
					const [checked, setChecked] = useState(false)

					return (
						<Flex align="center" gap={1}>
							<Text muted>#</Text>

							<Box flex={1}>
								<TextInput
									{...elementProps}
									placeholder={`module-${moduleKey}`}
								/>
							</Box>

							<Button
								title="Click to copy"
								mode="ghost"
								icon={checked ? VscCheck : VscCopy}
								disabled={checked}
								onClick={() => {
									navigator.clipboard.writeText(
										'#' + (elementProps.value || `module-${moduleKey}`),
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
		defineField({
			name: 'hidden',
			type: 'boolean',
			description: 'Hide the module from the page',
			initialValue: false,
		}),
		defineField({
			name: 'scopedCss',
			title: 'Scoped CSS',
			type: 'code',
			description: "Use `:scope` to select the module's root element",
			options: {
				language: 'css',
				languageAlternatives: [{ title: 'CSS', value: 'css' }],
			},
		}),
	],
})
