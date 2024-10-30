import { createClient } from 'next-sanity'
import dev from '@/lib/env'

export default createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	// token: process.env.NEXT_PUBLIC_SANITY_TOKEN for private datasets
	apiVersion: '2024-10-30',
	useCdn: !dev,
	stega: {
		enabled: false,
		studioUrl: '/admin',
	},
})
