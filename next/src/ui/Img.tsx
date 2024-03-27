'use client'

import {
	useNextSanityImage,
	type UseNextSanityImageOptions,
} from 'next-sanity-image'
import { client } from '@/lib/sanity'
import Image, { type ImageProps } from 'next/image'

export default function Img({
	image,
	alt = '',
	options,
	...props
}: Omit<ImageProps, 'src' | 'alt'> & {
	image?: Sanity.Image
	alt?: string
	options?: UseNextSanityImageOptions
}) {
	if (!image) return null

	const imageProps = useNextSanityImage(client, image, options)

	return (
		<Image {...imageProps} alt={image.alt || alt} loading="lazy" {...props} />
	)
}
