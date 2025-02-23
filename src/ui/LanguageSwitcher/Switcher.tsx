'use client'

import { redirect, usePathname } from 'next/navigation'
import { languages, supportedLanguages } from '@/lib/i18n'
import type { ComponentProps } from 'react'
import type { Translations } from '.'

export type SwitcherProps = Omit<ComponentProps<'select'>, 'value' | 'onChange'>

export default function Switcher({
	translations,
	...props
}: {
	translations?: Translations[]
} & SwitcherProps) {
	const pathname = usePathname()

	const originalSlug = translations?.find((t) =>
		[t.slug, t.translated].includes(pathname),
	)?.slug

	const available = translations?.filter((t) => originalSlug === t.slug) ?? []

	const getTranslationValue = (id: string) => {
		const t = available?.find((t) => t.language === id)
		const isDefault = id === languages[0]

		if (!t) {
			return isDefault ? pathname : undefined
		}

		return isDefault ? t.slug : t.translated
	}

	return (
		<select
			value={pathname}
			onChange={(e) => redirect(e.target.value)}
			{...props}
		>
			{supportedLanguages.map(({ id, title }) => {
				const value = getTranslationValue(id)

				return (
					<option key={id} value={value} disabled={!value}>
						{title}
					</option>
				)
			})}
		</select>
	)
}
