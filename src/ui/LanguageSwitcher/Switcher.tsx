'use client'

import { useEffect, useState, type ComponentProps } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { DEFAULT_LANG, supportedLanguages } from '@/lib/i18n'
import type { Translation } from '.'
import { setLangCookie } from './actions'
import { cn } from '@/lib/utils'
import { VscGlobe, VscLoading } from 'react-icons/vsc'

export default function Switcher({
	translations,
	className,
	...props
}: {
	translations?: Translation[]
} & ComponentProps<'label'>) {
	const [loading, setLoading] = useState(false)
	const pathname = usePathname()

	useEffect(() => setLoading(false), [pathname])

	const originalSlug = translations?.find((t) =>
		[t.slug, t.translated].includes(pathname),
	)?.slug

	const available = translations?.filter((t) => originalSlug === t.slug) ?? []

	const getTranslationValue = (id: string) => {
		const t = available?.find((t) => t.language === id)
		const isDefault = id === DEFAULT_LANG

		if (!t) {
			return isDefault ? pathname : undefined
		}

		return isDefault ? t.slug : t.translated
	}

	return (
		<label
			className={cn('flex items-center gap-2', className)}
			title="Change language"
			{...props}
		>
			<span className="shrink-0">
				{loading ? <VscLoading className="animate-spin" /> : <VscGlobe />}
			</span>

			<select
				className="input border-canvas/10 focus:border-canvas/30 px-[.5em] outline-none"
				value={pathname}
				onChange={(e) => {
					setLoading(true)
					setLangCookie(
						(e.target as HTMLSelectElement).selectedOptions[0].dataset.lang,
					)
					redirect(e.target.value)
				}}
			>
				{supportedLanguages.map(({ id, title }) => {
					const value = getTranslationValue(id)
					return (
						<option value={value} data-lang={id} disabled={!value} key={id}>
							{title}
						</option>
					)
				})}
			</select>
		</label>
	)
}
