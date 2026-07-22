import { groq } from 'next-sanity'

// @sanity-typegen-ignore
export const PERSON_LIST_QUERY = groq`
	_type == 'person-list' => {
		people[]->
	}
`
