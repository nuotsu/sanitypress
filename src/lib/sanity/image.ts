import imageUrlBuilder from '@sanity/image-url'
import { projectId, dataset } from '@sanity/src/env'

const builder = imageUrlBuilder({ projectId, dataset })

export function urlFor(image: Sanity.Image) {
	return builder.image(image)
}
