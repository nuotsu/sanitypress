import { groq } from 'next-sanity'

// @sanity-typegen-ignore
export const IMAGE_GALLERY_QUERY = groq`
	_type == 'image-gallery' => {
		rows[]{
			...,
			images[]{
				...,
				asset->{
					...,
					metadata
				}
			}
		}
	}
`
