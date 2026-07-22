import { groq } from 'next-sanity'

// @sanity-typegen-ignore
export const BREADCRUMBS_QUERY = (LINK_QUERY: string) => groq`
	_type == 'breadcrumbs' => {
		crumbs[]{ ${LINK_QUERY} }
	}
`
