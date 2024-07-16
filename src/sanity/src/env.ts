import { isDev } from 'sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!

export const BASE_URL = isDev
	? 'http://localhost:3000'
	: process.env.NEXT_PUBLIC_BASE_URL!
