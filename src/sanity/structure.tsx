import { structureTool } from 'sanity/structure'
import { group, singleton } from './lib/utils'
import { VscFiles, VscServerProcess } from 'react-icons/vsc'
import { BsDatabaseAdd } from 'react-icons/bs'

export const structure = structureTool({
	structure: (S) =>
		S.list()
			.title('Content')
			.items([
				singleton(S, 'site', 'Site settings').icon(VscServerProcess),
				S.divider(),

				S.documentTypeListItem('page').title('Pages').icon(VscFiles),
				S.documentTypeListItem('global-module').title('Global modules'),
				S.divider(),

				S.documentTypeListItem('blog.post').title('Blog posts'),
				S.documentTypeListItem('blog.category').title('Blog categories'),
				S.divider(),

				S.documentTypeListItem('navigation'),
				S.documentTypeListItem('redirect').title('Redirects'),

				group(S, 'Miscellaneous', [
					S.documentTypeListItem('announcement').title('Announcements'),
					S.documentTypeListItem('logo').title('Logos'),
					S.documentTypeListItem('person').title('People'),
					S.documentTypeListItem('pricing').title('Pricing tiers'),
					S.documentTypeListItem('reputation'),
					S.documentTypeListItem('testimonial').title('Testimonials'),
				]).icon(BsDatabaseAdd),
			]),
})
