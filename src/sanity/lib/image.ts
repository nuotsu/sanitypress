import {
	createImageUrlBuilder,
	type SanityImageSource,
} from '@sanity/image-url'
import type { ImageLoaderProps } from 'next/image'
import { dataset, projectId } from '@/sanity/env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source: SanityImageSource) => {
	return builder.image(source)
}

// `next/image` loader that resizes on the Sanity CDN instead of re-processing
// through Next's image optimizer (the URL already carries `auto=format`, `q`, crop)
export function sanityImageLoader({ src, width, quality }: ImageLoaderProps) {
	const url = new URL(src)
	url.searchParams.set('w', String(width))
	if (quality) url.searchParams.set('q', String(quality))
	return url.href
}
