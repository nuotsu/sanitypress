'use client'

import { usePathname } from 'next/navigation'
import { languages } from '@/lib/i18n'

export default function getLang() {
	const pathname = usePathname()

	const { lang } =
		pathname.match(new RegExp(`^\/(blog\/)?(?<lang>[${languages.join('|')}]+)`))
			?.groups ?? {}

	return lang || languages?.[0] || 'en'
}
