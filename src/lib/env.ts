import errors from './errors'

export const dev = process.env.NODE_ENV === 'development'

export const vercelPreview = process.env.VERCEL_ENV === 'preview'

if (!process.env.NEXT_PUBLIC_BASE_URL) {
	throw new Error(errors.missingBaseUrl)
}

export const BASE_URL = dev
	? 'http://localhost:3000'
	: process.env.NEXT_PUBLIC_BASE_URL!

export const BLOG_DIR = 'blog'
