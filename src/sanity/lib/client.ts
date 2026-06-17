import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

// import { token } from '@/sanity/lib/token'

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
	// token, // required for private datasets
	stega: {
		studioUrl: '/admin',
	},
})
