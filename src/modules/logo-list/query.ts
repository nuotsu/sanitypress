import { groq } from 'next-sanity'

// @sanity-typegen-ignore
export const LOGO_LIST_QUERY = groq`
	_type == 'logo-list' => {
		logos[]->
	}
`
