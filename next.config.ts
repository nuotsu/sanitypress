import path from 'node:path'
import type { NextConfig } from 'next'
import { groq } from 'next-sanity'
import { sanity } from 'next-sanity/live/cache-life'
import { ROUTES } from './src/lib/env'
import { client } from './src/sanity/lib/client'

const nextConfig: NextConfig = {
	cacheComponents: true,
	cacheLife: { default: sanity },
	reactCompiler: true,

	images: {
		localPatterns: [{ pathname: '/api/og' }],
		remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
	},

	async rewrites() {
		return [
			{ source: '/:slug.md', destination: '/api/md/:slug' },
			{ source: '/:path*/:slug.md', destination: '/api/md/:path*/:slug' },
		]
	},

	webpack(config, { isServer }) {
		if (!isServer) {
			config.resolve.alias = {
				...config.resolve.alias,
				// fix for @sanity/code-input on Vercel prod
				'@codemirror/state': path.resolve('./node_modules/@codemirror/state'),
				'@codemirror/view': path.resolve('./node_modules/@codemirror/view'),
			}
		}
		return config
	},

	async redirects() {
		return await client.fetch(
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
	},
}

export default nextConfig
