'use client'

import NextImage, { type ImageProps } from 'next/image'
import { sanityImageLoader } from '@/sanity/lib/image'

// The loader must be passed from a client module (functions can't cross the server/client boundary)
export default function SanityImage(props: ImageProps) {
	return <NextImage loader={sanityImageLoader} {...props} />
}
