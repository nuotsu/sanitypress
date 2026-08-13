export const dev =
	process.env.NODE_ENV === 'development' ||
	process.env.VERCEL_ENV === 'preview' ||
	process.env.CONTEXT === 'deploy-preview' ||
	process.env.CONTEXT === 'branch-deploy'

export const ROUTES = {
	studio: 'admin',
	blog: 'blog',
	a11y: 'accessibility-statement',
	// @example services: 'services',
	// @example caseStudies: 'case-studies',
} as const
