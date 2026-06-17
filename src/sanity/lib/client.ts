import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

// import { token } from './token'

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
