'use client'

import { usePathname } from 'next/navigation'
import { languages } from '@/lib/i18n'
import type { ComponentProps } from 'react'

export default function Root(props: ComponentProps<'html'>) {
	const pathname = usePathname()

	const { lang } =
		pathname.match(new RegExp(`^\/(blog\/)?(?<lang>[${languages.join('|')}]+)`))
			?.groups ?? {}

	return <html lang={lang} {...props} />
}
