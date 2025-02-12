export const dev = process.env.NODE_ENV === 'development'

export const vercelPreview = process.env.VERCEL_ENV === 'preview'

if (!process.env.NEXT_PUBLIC_BASE_URL) {
	throw new Error(
		'Missing base url: 🤞 Domain Expansion (Unlimited Void) requires a proper URL!\n\n' +
			'Solution: Set your website URL as NEXT_PUBLIC_BASE_URL in your environment variables (including https://).\n\n' +
			'💁‍♂️ https://sanitypress.dev/docs/errors#missing-base-url',
	)
}

export const BASE_URL = dev
	? 'http://localhost:3000'
	: process.env.NEXT_PUBLIC_BASE_URL!
