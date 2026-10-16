// bun test src/proxy.test.ts
import assert from 'node:assert/strict'
import { test } from 'node:test'
import { getRewrittenUrl, isRewrite } from 'next/experimental/testing/server'
import { NextRequest } from 'next/server'
import { proxy } from './proxy'

const HTML = {
	Googlebot:
		'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
	'Googlebot Smartphone':
		'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
	Bingbot:
		'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
	DuckDuckBot: 'DuckDuckBot/1.1; (+http://duckduckgo.com/duckduckbot.html)',
	Applebot:
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15 (Applebot/0.1; +http://www.apple.com/go/applebot)',
	YandexBot: 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
	Baiduspider:
		'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)',
	Chrome:
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
}

const MARKDOWN = {
	GPTBot:
		'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; GPTBot/1.2; +https://openai.com/gptbot)',
	'ChatGPT-User':
		'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot',
	'OAI-SearchBot':
		'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot',
	ClaudeBot:
		'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; ClaudeBot/1.0; +claudebot@anthropic.com)',
	'Claude-User': 'Claude-User/1.0 (+Claude-User@anthropic.com)',
	'Claude-SearchBot': 'Claude-SearchBot/1.0 (+Claude-SearchBot@anthropic.com)',
	'Claude-Web': 'Claude-Web/1.0 (web crawler; +https://www.anthropic.com/)',
	'anthropic-ai': 'anthropic-ai',
	PerplexityBot:
		'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
	'Perplexity-User':
		'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Perplexity-User/1.0; +https://perplexity.ai/perplexity-user)',
	CCBot: 'CCBot/2.0 (https://commoncrawl.org/faq/)',
}

const run = (headers: Record<string, string>, path = '/') =>
	proxy(new NextRequest(`https://sanitypress.dev${path}`, { headers }))

for (const [name, ua] of Object.entries(HTML)) {
	test(`${name} gets HTML`, () => {
		assert.equal(run({ 'user-agent': ua }), undefined)
	})
}

for (const [name, ua] of Object.entries(MARKDOWN)) {
	test(`${name} gets Markdown`, () => {
		const res = run({ 'user-agent': ua }, '/docs/intro')
		assert.ok(res && isRewrite(res))
		assert.equal(
			getRewrittenUrl(res),
			'https://sanitypress.dev/api/md/docs/intro',
		)
		assert.equal(res.headers.get('vary'), 'Accept, User-Agent')
	})
}

test('Accept: text/markdown gets Markdown, even from a search crawler', () => {
	const res = run({ 'user-agent': HTML.Googlebot, accept: 'text/markdown' })
	assert.ok(res && isRewrite(res))
	assert.equal(getRewrittenUrl(res), 'https://sanitypress.dev/api/md/index')
	assert.equal(res.headers.get('vary'), 'Accept, User-Agent')
})
