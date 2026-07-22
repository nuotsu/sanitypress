import { groq } from 'next-sanity'

// @sanity-typegen-ignore
export const TABBED_CONTENT_QUERY = (LINK_QUERY: string) => groq`
	_type == 'tabbed-content' => {
		tabs[]{
			...,
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
			ctas[]{
				...,
				link{ ${LINK_QUERY} }
			}
		}
	}
`
