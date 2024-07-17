import { Studio } from './Studio'

// Ensures the Studio route is statically generated
export const dynamic = 'force-static'

// Extend serverless function timeout
export const maxDuration = 60 // sec

// Set the right `viewport`, `robots` and `referer` meta tags
export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
	return <Studio />
}
