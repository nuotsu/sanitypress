import { createClient, groq } from 'next-sanity'
import { projectId, dataset, apiVersion } from '@/sanity/lib/env'
// import { token } from '@/lib/sanity/token'
import type { NextConfig } from 'next'

const client = createClient({
	projectId,
	dataset,
	// token, // for private datasets
	apiVersion,
	useCdn: true,
})

export default {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
		],
	},

	async redirects() {
		return await client.fetch(groq`*[_type == 'redirect']{
			source,
			'destination': select(
				destination.type == 'internal' =>
					select(
						destination.internal->._type == 'blog.post' => '/blog/',
						'/'
					) + destination.internal->.metadata.slug.current,
				destination.external
			),
			permanent
		}`)
	},

	env: {
		SC_DISABLE_SPEEDY: 'false',
	},

	// logging: {
	// 	fetches: {
	// 		fullUrl: true,
	// 	},
	// },
} satisfies NextConfig
