'use server'

import { cookies } from 'next/headers'
import { langCookieName } from '@/lib/i18n'

export async function setLangCookie(lang?: string) {
	if (!lang) return
	;(await cookies()).set(langCookieName, lang)
}
