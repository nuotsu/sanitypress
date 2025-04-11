import { preload } from 'react-dom'
import { getImageDimensions } from '@sanity/asset-utils'
import { urlFor } from '@/sanity/lib/image'
import NextImage, { getImageProps, type ImageProps } from 'next/image'
import { stegaClean } from 'next-sanity'
import type { ComponentProps } from 'react'

type ImgProps = { alt?: string } & Omit<ImageProps, 'src' | 'alt'>

export function Img({
	image,
	width: w,
	height: h,
	...props
}: { image?: Sanity.Image } & ImgProps) {
	if (!image?.asset) return null

	const { src, width, height } = generateSrc(image, w, h)

	const loading = stegaClean(image.loading)

	return (
		<NextImage
			src={src}
			width={width}
			height={height}
			alt={props.alt || image.alt || ''}
			loading={loading}
			priority={loading === 'eager'}
			placeholder={image.lqip ? 'blur' : undefined}
			blurDataURL={image.lqip}
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
} & ComponentProps<'source'>) {
	if (!image?.asset) return null

	const { src, width, height } = generateSrc(image, w, h)
	const { props: imageProps } = getImageProps({ src, width, height, alt: '' })

	if (stegaClean(image.loading) === 'eager') {
		preload(imageProps.src, { as: 'image' })
	}

	return (
		<source
			srcSet={imageProps.srcSet}
			width={imageProps.width}
			height={imageProps.height}
			media={media}
			{...props}
		/>
	)
}

export function ResponsiveImg({
	img,
	pictureProps,
	...props
}: {
	img?: Sanity.Img
	pictureProps?: ComponentProps<'picture'>
} & ImgProps) {
	if (!img) return null

	const { responsive, ...imgProps } = img

	return (
		<picture {...pictureProps}>
			{responsive?.map((r, key) => <Source {...r} key={key} />)}
			<Img {...imgProps} {...props} />
		</picture>
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
