import { singleton } from './utils'
import type { StructureResolver } from 'sanity/structure'

import { VscServerProcess, VscSymbolMisc } from 'react-icons/vsc'

const structure: StructureResolver = (S, context) =>
	S.list()
		.title('Content')
		.items([
			singleton(S, 'Site', 'site').icon(VscServerProcess),
			S.documentTypeListItem('navigation'),
			S.documentTypeListItem('redirect').title('Redirects'),
			S.divider(),

			S.documentTypeListItem('page').title('Pages'),
			S.divider(),

			S.documentTypeListItem('blog.post').title('Blog posts'),
			S.documentTypeListItem('blog.category').title('Blog categories'),
			S.divider(),

			S.listItem()
				.title('Content dump')
				.icon(VscSymbolMisc)
				.child(
					S.documentList()
						.title('Content dump')
						.filter(`_type in ['testimonial']`),
				),
		])

export default structure
