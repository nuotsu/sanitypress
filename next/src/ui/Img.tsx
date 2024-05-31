import {
	useNextSanityImage,
	type UseNextSanityImageOptions,
} from 'next-sanity-image'
import client from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/urlFor'
import { stegaClean } from '@sanity/client/stega'

const SIZES = [
	120, 160, 200, 240, 320, 400, 480, 520, 560, 600, 640, 800, 960, 1280, 1440,
	1600, 1800, 2000,
]

export default function Img({
	image,
	imageWidth,
	imageSizes = SIZES,
	alt = '',
	options,
	...props
}: {
	image: Sanity.Image | undefined
	imageWidth?: number
	imageSizes?: number[]
	options?: UseNextSanityImageOptions
} & React.ImgHTMLAttributes<HTMLImageElement>) {
	if (!image?.asset) return null

	const { src, width, height } = useNextSanityImage(
		client,
		image,
		imageWidth ? { imageBuilder: (b) => b.width(imageWidth) } : options,
	)

	return (
		<img
			src={src}
			srcSet={
				generateSrcset(image, { width: imageWidth, sizes: imageSizes }) || src
			}
			width={width}
			height={height}
			alt={stegaClean(image.alt) || alt}
			loading={stegaClean(image.loading) || 'lazy'}
			decoding="async"
			{...props}
		/>
	)
}

export function Source({
	image,
	imageWidth,
	imageSizes = SIZES,
	options,
	media = '(max-width: 768px)',
}: {
	image: Sanity.Image | undefined
	imageWidth?: number
	imageSizes?: number[]
	options?: UseNextSanityImageOptions
	media?: string
}) {
	if (!image) return null

	const { src, width, height } = useNextSanityImage(
		client,
		image,
		imageWidth ? { imageBuilder: (b) => b.width(imageWidth) } : options,
	)

	return (
		<source
			srcSet={
				generateSrcset(image, { width: imageWidth, sizes: imageSizes }) || src
			}
			width={width}
			height={height}
			media={media}
		/>
	)
}

function generateSrcset(
	image: Sanity.Image,
	{
		width,
		sizes = SIZES,
	}: {
		width?: number
		sizes: number[]
	},
) {
	return (
		sizes
			.filter((size) => !width || size <= width)
			.map(
				(size) => `${urlFor(image).width(size).auto('format').url()} ${size}w`,
			)
			.join(', ') || undefined
	)
}
