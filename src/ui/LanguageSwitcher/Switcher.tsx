'use client'

import { useEffect, useState, type ComponentProps } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { DEFAULT_LANG, supportedLanguages } from '@/lib/i18n'
import { setLangCookie } from './actions'
import { VscGlobe, VscLoading } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

export default function Switcher({
	translations: T,
	className,
	...props
}: {
	translations: Sanity.Translation[]
} & ComponentProps<'label'>) {
	const [loading, setLoading] = useState(false)
	const pathname = usePathname()

	useEffect(() => setLoading(false), [pathname])

	const available = T.find((t) =>
		[
			t.slug,
			...(t.translations?.flatMap((p) => [p.slug, p.slugBlogAlt]) ?? []),
		].includes(pathname),
	)

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
				value={pathname === available?.slug ? available.slug : pathname}
				onChange={(e) => {
					setLoading(true)
					setLangCookie(
						(e.target as HTMLSelectElement).selectedOptions[0].dataset.lang,
					)
					redirect(e.target.value)
				}}
			>
				{supportedLanguages.map((s) => {
					const { slug, slugBlogAlt, language } =
						available?.translations?.find((t) => t.language === s.id) ?? {}

					const value =
						language === DEFAULT_LANG ? available?.slug : (slugBlogAlt ?? slug)

					return (
						<option
							value={value}
							data-lang={language}
							disabled={!value}
							key={s.id}
						>
							{s.title}
						</option>
					)
				})}
			</select>
		</label>
	)
}
