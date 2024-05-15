import imageUrlBuilder from '@sanity/image-url'
import client from './client'

const builder = imageUrlBuilder(client)

export function urlFor(image: Sanity.Image) {
	return builder.image(image)
}
