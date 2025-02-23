'use server'

import { cookies } from 'next/headers'

export async function setLangCookie(lang?: string) {
	if (!lang) return
	;(await cookies()).set('lang', lang)
}
