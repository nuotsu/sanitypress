import { NextResponse, type NextRequest } from 'next/server'

const BOT =
	/bot|crawl|spider|gptbot|claudebot|claude-web|anthropic|chatgpt|oai-searchbot|perplexity|ccbot|google-extended/i

export function proxy(req: NextRequest) {
	const wantsMd =
		req.headers.get('accept')?.includes('text/markdown') ||
		BOT.test(req.headers.get('user-agent') ?? '')
	if (!wantsMd) return

	const { pathname } = req.nextUrl
	const url = req.nextUrl.clone()
	url.pathname = `/api/md${pathname === '/' ? '/index' : pathname}`

	const res = NextResponse.rewrite(url)
	res.headers.append('Vary', 'Accept, User-Agent')
	return res
}

export const config = {
	// skip api, studio, _next, and anything with a file extension (incl. .md)
	matcher: ['/((?!api|admin|_next|.*\\..*).*)'],
}
