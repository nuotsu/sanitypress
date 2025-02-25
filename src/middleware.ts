import {
	NextResponse,
	type NextRequest,
	type MiddlewareConfig,
} from 'next/server'
import { getTranslations } from './ui/LanguageSwitcher'
import { DEFAULT_LANG } from './lib/i18n'

export default async function (request: NextRequest) {
	const { pathname } = request.nextUrl
	const lang = request.cookies.get('lang')?.value

	const T = await getTranslations()

	const isPrefixed = !!T.find((t) =>
		t.translations?.some(({ slug }) => slug === pathname),
	)

	if (!request.cookies.has('lang') && !isPrefixed) return NextResponse.next()

	const available = T?.find((t) =>
		[t.slug, ...(t.translations?.map(({ slug }) => slug) ?? [])].includes(
			pathname,
		),
	)
	if (!available) return NextResponse.next()

	const cookieMatchesCurrentPrefix =
		// cookie matches current prefix
		lang ===
			available.translations?.find((t) => t.slug === pathname)?.language ||
		// default language and current path is the base path
		(lang === DEFAULT_LANG && pathname === available.slug)

	if (!cookieMatchesCurrentPrefix) {
		const target = available.translations?.find((t) => t.language === lang)
		// use base path for default language
		const url =
			target?.language === DEFAULT_LANG ? available.slug : target?.slug

		if (!url) return NextResponse.next()
		return NextResponse.redirect(new URL(url, request.url))
	}

	return NextResponse.next()
}

export const config: MiddlewareConfig = {
	matcher: ['/((?!favicon.ico|_next|api|admin).*)'],
}
