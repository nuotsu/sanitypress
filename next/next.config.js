const { createClient, groq } = require('next-sanity')

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: 'production',
	apiVersion: '2024-04-01',
	useCdn: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
			},
		],
	},

	async redirects() {
		const redirects = await client.fetch(groq`*[_type == 'redirect']`)
		return redirects?.map(({ source, destination, permanent }) => ({
			source,
			destination,
			permanent,
		}))
	},

	// logging: {
	// 	fetches: {
	// 		fullUrl: true,
	// 	},
	// },
}

module.exports = nextConfig
