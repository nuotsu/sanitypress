import { createClient, groq } from 'next-sanity'
import type { NextConfig } from 'next'

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	// token: process.env.NEXT_PUBLIC_SANITY_TOKEN for private datasets
	apiVersion: '2024-10-30',
	useCdn: true,
})

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
		],
	},

	async redirects() {
		return await client.fetch(groq`*[_type == 'redirect']{
			source,
			destination,
			permanent
		}`)
	},

	// logging: {
	// 	fetches: {
	// 		fullUrl: true,
	// 	},
	// },
}

export default nextConfig
