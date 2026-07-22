import { groq } from 'next-sanity'
import { LINK_QUERY } from '@/sanity/lib/fragments'

// @sanity-typegen-ignore
export const BREADCRUMBS_QUERY = groq`
	_type == 'breadcrumbs' => {
		crumbs[]{ ${LINK_QUERY} }
	}
`
