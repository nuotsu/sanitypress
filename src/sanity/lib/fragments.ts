import { groq } from 'next-sanity'

// Shared GROQ fragments — kept separate from queries.ts so per-module
// query.ts files can import them without circular imports.

// @sanity-typegen-ignore
export const LINK_QUERY = groq`
	...,
	type == 'internal' => {
		internal->{
			_type,
			title,
			'slug': select(
				metadata.slug.current == 'index' => '/',
				'/' + metadata.slug.current
			)
		}
	}
`
