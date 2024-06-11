import { group, singleton } from './utils'
import type { StructureResolver } from 'sanity/structure'

import { VscServerProcess } from 'react-icons/vsc'
import { BsDatabaseAdd } from 'react-icons/bs'

const structure: StructureResolver = (S, context) =>
	S.list()
		.title('Content')
		.items([
			singleton(S, 'site').icon(VscServerProcess),
			S.documentTypeListItem('page').title('Pages'),
			S.divider(),

			S.documentTypeListItem('navigation'),
			S.documentTypeListItem('announcement').title('Announcements'),
			S.documentTypeListItem('redirect').title('Redirects'),
			S.divider(),

			S.documentTypeListItem('blog.post').title('Blog posts'),
			S.documentTypeListItem('blog.category').title('Blog categories'),
			S.divider(),

			group(S, 'Miscellaneous', [
				S.documentTypeListItem('logo').title('Logos'),
				S.documentTypeListItem('pricing').title('Pricing tiers'),
				S.documentTypeListItem('testimonial').title('Testimonials'),
			]).icon(BsDatabaseAdd),
		])

export default structure
