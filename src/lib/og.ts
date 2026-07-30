import type { SanityImageSource } from '@sanity/image-url'
import { urlFor } from '@/sanity/lib/image'

type ImageWithAsset = {
	asset?: unknown
} & SanityImageSource

export function resolveOgImage({
	image,
	siteOgImage,
	slug = 'index',
}: {
	image?: ImageWithAsset | null
	siteOgImage?: ImageWithAsset | null
	slug?: string
}): string {
	if (image?.asset) {
		return urlFor(image).width(1200).url()
	}

	if (siteOgImage?.asset) {
		return urlFor(siteOgImage).width(1200).url()
	}

	return `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?slug=${slug || 'index'}`
}
