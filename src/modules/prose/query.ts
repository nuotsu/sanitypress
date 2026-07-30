import { groq } from 'next-sanity'

// @sanity-typegen-ignore
export const PROSE_QUERY = (LINK_QUERY: string) => groq`
	_type == 'prose' => {
		content[]{
			...,
			_type == 'image' => {
				...,
				asset->{
					...,
					metadata
				}
			},
			_type == 'ctas' => {
				ctas[]{
					...,
					link{ ${LINK_QUERY} }
				}
			}
		},
		'headings': content[style in ['h2', 'h3', 'h4', 'h5', 'h6']]{
			style,
			'text': pt::text(@)
		}
	}
`
