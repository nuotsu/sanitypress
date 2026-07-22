import { groq } from 'next-sanity'

// @sanity-typegen-ignore
export const CARD_LIST_QUERY = (LINK_QUERY: string) => groq`
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
