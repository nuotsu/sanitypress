export const dev =
	process.env.NODE_ENV === 'development' ||
	process.env.VERCEL_ENV === 'preview' ||
	process.env.CONTEXT === 'deploy-preview' ||
	process.env.CONTEXT === 'branch-deploy'

/** Production origin without a trailing slash, e.g. `https://sanitypress.dev` */
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, '')

export const ROUTES = {
	studio: 'admin',
	blog: 'blog',
	a11y: 'accessibility-statement',
	// @example services: 'services',
	// @example caseStudies: 'case-studies',
} as const
