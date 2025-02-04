import { preload } from 'react-dom'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlFor } from '@/sanity/lib/image'
import Image, { type ImageProps } from 'next/image'
import type { ComponentProps } from 'react'
import { stegaClean } from 'next-sanity'

export default function Img({
	image,
	width: w,
	height: h,
	...props
}: {
	image?: Sanity.Image
	alt?: string
} & Omit<ImageProps, 'src' | 'alt'>) {
	if (!image?.assetId) return null

	const { src, width, height } = generateSrc(image, w, h)

	if (stegaClean(image.loading) === 'eager') {
		preload(src, { as: 'image' })
	}

	return (
		<Image
			src={src}
			width={width}
			height={height}
			alt={props.alt || image.alt || ''}
			loading={stegaClean(image.loading)}
			{...props}
		/>
	)
}

export function Source({
	image,
	media = '(width < 48rem)',
	width: w,
	height: h,
	...props
}: {
	image?: Sanity.Image
} & Omit<ComponentProps<'source'>, ''>) {
	if (!image?.assetId) return null

	const { src, width, height } = generateSrc(image, w, h)

	if (stegaClean(image.loading) === 'eager') {
		preload(src, { as: 'image' })
	}

	return (
		<source
			srcSet={src}
			width={width}
			height={height}
			media={media}
			{...props}
		/>
	)
}

function generateSrc(
	image: Sanity.Image,
	w?: number | `${number}` | string,
	h?: number | `${number}` | string,
) {
	const { width: w_orig, height: h_orig } = getImageDimensions(image)

	const w_calc = !!w // if width is provided
		? Number(w)
		: // if height is provided, calculate width
			!!h && Math.floor((Number(h) * w_orig) / h_orig)

	const h_calc = !!h // if height is provided
		? Number(h)
		: // if width is provided, calculate height
			!!w && Math.floor((Number(w) * h_orig) / w_orig)

	return {
		src: urlFor(image)
			.withOptions({
				width: !!w ? Number(w) : undefined,
				height: !!h ? Number(h) : undefined,
				auto: 'format',
			})
			.url(),
		width: w_calc || w_orig,
		height: h_calc || h_orig,
	}
}
