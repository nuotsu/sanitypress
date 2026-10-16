import type { NextConfig } from 'next'
import { groq } from 'next-sanity'
import { sanity } from 'next-sanity/live/cache-life'
import { BASE_URL, ROUTES } from './src/lib/env'
import { client } from './src/sanity/lib/client'

// Only the production domain may be indexed (not *.vercel.app or preview deployments)
const PRODUCTION_HOSTNAME = BASE_URL && new URL(BASE_URL).hostname

const nextConfig: NextConfig = {
	reactCompiler: true,

	cacheComponents: true,
	cacheLife: { default: sanity },

	images: {
		localPatterns: [{ pathname: '/api/og' }],
		remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
	},

	async headers() {
		if (!PRODUCTION_HOSTNAME) return []

		return [
			{
				source: '/:path*',
				missing: [
					{
						type: 'host',
						value: PRODUCTION_HOSTNAME.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
					},
				],
				headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
			},
		]
	},

	async rewrites() {
		return [
			{ source: '/:slug.md', destination: '/api/md/:slug' },
			{ source: '/:path*/:slug.md', destination: '/api/md/:path*/:slug' },
		]
	},

	async redirects() {
		const sanityRedirects = await client.fetch(
			groq`*[_type == 'redirect']{
				source,
				'destination': select(
					destination.type == 'internal' =>
						select(
							destination.internal->._type == 'blog.post' => $blogDir,
							''
						) + select(
							destination.internal->.metadata.slug.current == 'index' => '/',
							'/' + destination.internal->.metadata.slug.current
						),
					destination.external
				),
				'permanent': true
			}`,
			{ blogDir: `/${ROUTES.blog}/` },
		)

		return [
			{ source: '/index', destination: '/', permanent: true },
			...sanityRedirects,
		]
	},
}

export default nextConfig
