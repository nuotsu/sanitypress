import 'server-only'

export const token = process.env.SANITY_API_READ_TOKEN

if (!token) {
	throw Error('Missing SANITY_API_READ_TOKEN')
}
