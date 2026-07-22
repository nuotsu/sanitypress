import { structureTool } from 'sanity/structure'
import { DocumentIcon } from '@sanity/icons/Document'
import { EarthGlobeIcon } from '@sanity/icons/EarthGlobe'
import { EmptyIcon } from '@sanity/icons/Empty'
import { apiVersion } from './env'
import { singleton } from './lib/builders'
import { pageDirectoriesListItem } from './lib/page-directories'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export default structureTool({
	structure: (S, context) =>
		S.list()
			.title('Structure')
			.items([
				S.divider().title('Global'),
				singleton(S, 'site').title('Site').icon(EarthGlobeIcon),
				S.documentTypeListItem('global-module').title('Global modules'),
				S.documentTypeListItem('skill').title('Skills'),

				S.divider().title('Pages'),
				S.documentTypeListItem('page').title('Pages').icon(DocumentIcon),
				pageDirectoriesListItem(S, context),

				S.divider().title('Blog'),
				S.documentTypeListItem('blog.post').title('Posts'),
				S.documentTypeListItem('blog.category').title('Categories'),

				S.divider().title('Navigation'),
				S.documentTypeListItem('navigation'),
				S.documentTypeListItem('redirect').title('Redirects'),

				S.divider().title('References'),
				S.documentTypeListItem('form').title('Forms'),
				S.documentTypeListItem('logo').title('Logos'),
				S.documentTypeListItem('person').title('People'),
				S.documentTypeListItem('quote').title('Quotes'),

				S.divider().title('Drafts'),
				S.listItem()
					.title('Drafts')
					.icon(EmptyIcon)
					.child(
						S.documentList()
							.title('Drafts')
							.apiVersion(apiVersion)
							.filter(
								'_originalId in path("drafts.**") && !(_type match "sanity.*")',
							),
					),
			]),
})
