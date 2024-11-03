import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from '@/lib/sanity/env'
import { dev } from '@/lib/env'

export default createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: !dev,
	stega: {
		studioUrl: '/admin',
	},
})
