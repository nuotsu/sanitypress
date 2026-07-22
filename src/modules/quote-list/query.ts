import { groq } from 'next-sanity'

// @sanity-typegen-ignore
export const QUOTE_LIST_QUERY = groq`
	_type == 'quote-list' => {
		quotes[]->
	}
`
