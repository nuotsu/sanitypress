import type {
	StructureBuilder,
	StructureResolverContext,
} from 'sanity/structure'
import { groq } from 'next-sanity'
import { map } from 'rxjs'
import { apiVersion } from '@/sanity/env'

const PAGE_SLUGS_QUERY = groq`
	*[_type == 'page' && defined(metadata.slug.current)]{ "slug": metadata.slug.current }
`

const PAGE_DIRECTORY_FILTER = groq`
	_type == 'page' && (
		metadata.slug.current == $dir ||
		string::startsWith(metadata.slug.current, $dir + '/')
	)
`

function getUniqueDirs(slugs: string[]) {
	return [
		...slugs.reduce((dirs, slug) => {
			const parts = slug.split('/')
			for (let i = 1; i < parts.length; i++)
				dirs.add(parts.slice(0, i).join('/'))
			return dirs
		}, new Set<string>()),
	].sort()
}

const dirItem = (S: StructureBuilder, dir: string) =>
	S.listItem()
		.id(`page-dir-${dir.replace(/\//g, '--')}`)
		.title(`/${dir}`)
		.child(
			S.documentList()
				.apiVersion(apiVersion)
				.title(`/${dir}`)
				.schemaType('page')
				.filter(PAGE_DIRECTORY_FILTER)
				.params({ dir })
				.defaultOrdering([
					{ field: 'metadata.slug.current', direction: 'asc' },
				]),
		)

export function pageDirectoriesListItem(
	S: StructureBuilder,
	{ documentStore }: StructureResolverContext,
) {
	return S.listItem()
		.id('page-directories')
		.title('Directories')
		.child(() =>
			documentStore
				.listenQuery(
					PAGE_SLUGS_QUERY,
					{},
					{ apiVersion, tag: 'page-directories' },
				)
				.pipe(
					map((pages: { slug: string }[]) =>
						S.list()
							.title('Directories')
							.items(
								getUniqueDirs(pages.map((p) => p.slug)).map((dir) =>
									dirItem(S, dir),
								),
							),
					),
				),
		)
}
