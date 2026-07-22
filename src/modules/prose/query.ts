import { groq } from 'next-sanity'

// @sanity-typegen-ignore
export const PROSE_QUERY = groq`
	_type == 'prose' => {
		content[]{
			...,
			_type == 'image' => {
				...,
				asset->{
					...,
					metadata
				}
			}
		},
		'headings': content[style in ['h2', 'h3', 'h4', 'h5', 'h6']]{
			style,
			'text': pt::text(@)
		}
	}
`
