import { getImageDimensions } from '@sanity/asset-utils'
import type { ImageUrlBuilderOptionsWithAliases } from '@sanity/image-url'
import { stegaClean } from 'next-sanity'
import NextImage, { getImageProps, type ImageProps } from 'next/image'
import { preload } from 'react-dom'
import { urlFor } from '@/sanity/lib/image'
import type {
	SanityImageAsset,
	SanityImageCrop,
	SanityImageHotspot,
} from '@/sanity/types'

type Image =
	| {
			asset: SanityImageAsset
			crop?: SanityImageCrop
			hotspot?: SanityImageHotspot
	  }
	| any

export default function ({
	image,
	width,
	height,
	imageOptions,
	...props
}: {
	image?: Image
	imageOptions?: Partial<ImageUrlBuilderOptionsWithAliases>
} & Omit<ImageProps, 'src'>) {
	if (!image?.asset) return null

	const { lqip } = image.asset.metadata ?? {}

	const dimensions = getImageDimensions(image)
	const [w, h] = [
		(image.hotspot?.width ?? 1) * dimensions.width,
		(image.hotspot?.height ?? 1) * dimensions.height,
	]

	const loading = stegaClean(props.loading || image.loading)

	const finalWidth = width ?? Math.round(height ? (Number(height) * w) / h : w)
	const finalHeight = height ?? Math.round(width ? (Number(width) * h) / w : h)

	return (
		<NextImage
			src={
				urlFor(image)
					.withOptions({ auto: 'format', q: 75, ...imageOptions })
					.url() ?? image.asset.url!
			}
			width={finalWidth}
			height={finalHeight}
			sizes={`(min-width: 640px) ${finalWidth}px, 100vw`}
			loading={loading}
			{...(loading === 'eager'
				? { priority: true, fetchPriority: 'high' }
				: {})}
			placeholder={lqip ? 'blur' : undefined}
			blurDataURL={lqip}
			{...props}
		/>
	)
}

export function Source({
	image,
	width: targetWidth,
	height: targetHeight,
	media = '(width < 768px)',
	options,
	...props
}: {
	image: Image
	options?: ImageUrlBuilderOptionsWithAliases
} & React.ComponentProps<'source'>) {
	if (!image?.asset) return null

	const { src, width, height } = generateSrc(
		image,
		targetWidth,
		targetHeight,
		options,
	)
	const { props: imageProps } = getImageProps({ src, width, height, alt: '' })

	if (stegaClean(image.loading) === 'eager') {
		preload(imageProps.src, { as: 'image' })
	}

	return (
		<source
			srcSet={imageProps.src}
			width={imageProps.width}
			height={imageProps.height}
			media={media}
			{...props}
		/>
	)
}

function generateSrc(
	image: Image,
	w?: number | `${number}` | string,
	h?: number | `${number}` | string,
	options?: ImageUrlBuilderOptionsWithAliases,
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
				...options,
			})
			.url(),
		width: w_calc || w_orig,
		height: h_calc || h_orig,
	}
}
