import { createClient } from 'next-sanity'
import dev from '@/lib/env'

export const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: 'production',
	apiVersion: '2023-12-03',
	useCdn: !dev,
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
	perspective: dev ? 'previewDrafts' : 'published',
})
