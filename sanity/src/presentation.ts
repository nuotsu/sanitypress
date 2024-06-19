import { DocumentLocationResolver } from 'sanity/presentation'
import { map } from 'rxjs'

export const locations: DocumentLocationResolver = (params, context) => {
	if (['page', 'blog.post'].includes(params.type)) {
		const doc$ = context.documentStore.listenQuery(
			`*[_id == $id][0]{title,metadata}`,
			params,
			{ perspective: 'previewDrafts' },
		)

		return doc$.pipe(
			map((doc) => {
				if (!doc?.metadata?.slug?.current) return null

				const directory = params.type === 'blog.post' ? '/blog' : ''
				const slug = doc.metadata.slug.current
				const path = slug === 'index' ? '' : `/${slug}`

				return {
					locations: [
						{
							title: doc.title || doc.metadata.title || 'Untitled',
							href: [directory, path].filter(Boolean).join(''),
						},
					],
				}
			}),
		)
	}

	return null
}
