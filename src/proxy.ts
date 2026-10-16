import { NextResponse, type NextRequest } from 'next/server'

/**
 * Named AI agents/crawlers that should receive Markdown instead of HTML.
 *
 * Deliberately an allowlist: generic terms like `bot|crawl|spider` would also
 * match search engine crawlers (Googlebot, Bingbot, DuckDuckBot, Applebot,
 * YandexBot, Baiduspider, …), which must always get full HTML to be indexed.
 * `Google-Extended` is a robots.txt token, not a user agent, so it's omitted.
 *
 * HTML:
 *   Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
 *   Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)
 *   Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36
 * Markdown:
 *   Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)
 *   Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)
 *
 * See src/proxy.test.ts.
 */
export const AI_AGENT =
	/gptbot|chatgpt-user|oai-searchbot|claudebot|claude-user|claude-searchbot|claude-web|anthropic-ai|perplexitybot|perplexity-user|ccbot/i

export function proxy(req: NextRequest) {
	const wantsMd =
		req.headers.get('accept')?.includes('text/markdown') ||
		AI_AGENT.test(req.headers.get('user-agent') ?? '')
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
