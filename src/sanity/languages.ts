import type { Language } from '@sanity/document-internationalization'

export const supportedLanguages = [
	{ id: 'en', title: 'English' },
	{ id: 'ja', title: 'Japanese' },
] as const satisfies Language[]

export const languages = supportedLanguages.map((lang) => lang.id)

export type Lang = (typeof languages)[number]
