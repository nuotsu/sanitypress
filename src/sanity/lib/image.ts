import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/sanity/lib/client'

const builder = imageUrlBuilder(client)

export function urlFor(image: Sanity.Image) {
	return builder.image(image)
}
