import { groq } from 'next-sanity'
import { LINK_QUERY } from '@/sanity/lib/fragments'

// @sanity-typegen-ignore
export const TABBED_CONTENT_QUERY = groq`
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
