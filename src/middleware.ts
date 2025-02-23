import {
	NextResponse,
	type NextRequest,
	type MiddlewareConfig,
} from 'next/server'
import { getTranslations } from './ui/LanguageSwitcher'
import { languages } from './lib/i18n'

export default async function (request: NextRequest) {
	const { pathname } = request.nextUrl
	const lang = request.cookies.get('lang')?.value

	const isPage = pathname.match(new RegExp(`^/(${languages.join('|')})/`))
	const isBlogPost = pathname.match(
		new RegExp(`^/blog/(${languages.join('|')})/`),
	)

	// skip middleware if no language cookie and URL doesn't have language prefix
	if (!request.cookies.has('lang') && !isPage && !isBlogPost) {
		return NextResponse.next()
	}

	const translations = await getTranslations()

	// page
	if (!isBlogPost || !pathname.match('/blog/.+')) {
		const originalSlug = pathname.replace(
			new RegExp(`^/(${languages.join('|')})/(.*)`),
			'/$2',
		)

		const targetPath = `/${lang}${originalSlug}`

		if (
			pathname !== targetPath &&
			translations.find((t) => t.translated === targetPath)
		) {
			return NextResponse.redirect(new URL(targetPath, request.url))
		}

		if (
			pathname !== originalSlug &&
			!translations.find((t) => t.translated === pathname)
		) {
			return NextResponse.redirect(new URL(originalSlug, request.url))
		}
	}

	// blog.post
	if (!isPage || pathname.match('/blog/.+')) {
		const originalSlug = pathname.replace(
			new RegExp(`^/blog/(${languages.join('|')})/(.*)`),
			'/$2',
		)

		const targetPath = `/blog/${lang}${originalSlug.replace('blog/', '')}`

		if (
			pathname !== targetPath &&
			translations.find((t) => t.translated === targetPath)
		) {
			return NextResponse.redirect(new URL(targetPath, request.url))
		}

		if (
			pathname !== originalSlug &&
			!translations.find((t) => t.translated === pathname)
		) {
			return NextResponse.redirect(new URL(originalSlug, request.url))
		}
	}

	return NextResponse.next()
}

export const config: MiddlewareConfig = {
	matcher: ['/((?!favicon.ico|_next|api|admin).*)'],
}
