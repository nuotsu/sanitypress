import type { Language } from '@sanity/document-internationalization'

export const supportedLanguages = [
	{ id: 'en', title: 'English' },
	{ id: 'ja', title: 'Japanese' },
	// { id: 'fr', title: 'French' },
] as const satisfies Language[]

export const languages = supportedLanguages.map((lang) => lang?.id)

export type Lang = (typeof languages)[number]

export const translatableSchemaTypes = ['page', 'blog.post']
const schemaTypes = [...translatableSchemaTypes] as const

export type TranslatableSchemaType = (typeof schemaTypes)[number]
