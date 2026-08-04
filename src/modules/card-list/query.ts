import { groq } from 'next-sanity'
import { LINK_QUERY } from '@/sanity/lib/fragments'

// @sanity-typegen-ignore
export const CARD_LIST_QUERY = groq`
	_type == 'card-list' => {
		cards[]{
			...,
			ctas[]{
				...,
				link{ ${LINK_QUERY} }
			}
		}
	}
`
