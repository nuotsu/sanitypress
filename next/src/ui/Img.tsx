'use client'

import {
	useNextSanityImage,
	type UseNextSanityImageOptions,
} from 'next-sanity-image'
import { client } from '@/lib/sanity'
import Image, { type ImageProps } from 'next/image'

export default function Img({
	image,
	imageWidth,
	alt = '',
	options,
	...props
}: {
	image?: Sanity.Image
	imageWidth?: number
	alt?: string
	options?: UseNextSanityImageOptions
} & Omit<ImageProps, 'src' | 'alt'>) {
	if (!image) return null

	const imageProps = useNextSanityImage(
		client,
		image,
		imageWidth ? { imageBuilder: (b) => b.width(imageWidth) } : options,
	)

	return (
		<Image
			{...imageProps}
			alt={image.alt || alt}
			loading="lazy"
			unoptimized
			{...props}
		/>
	)
}
