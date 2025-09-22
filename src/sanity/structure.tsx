import { structureTool } from 'sanity/structure'
import { singleton, group, directory } from './lib/builders'
import { VscFiles, VscServerProcess } from 'react-icons/vsc'

export const structure = structureTool({
	structure: (S) =>
		S.list()
			.title('Content')
			.items([
				singleton(S, 'site', 'Site settings').icon(VscServerProcess),
				S.divider(),

				S.documentTypeListItem('page').title('All pages').icon(VscFiles),
				// customize page directories
				group(S, 'Directories', [
					directory(S, 'docs', { maxLevel: 1 }).title('Docs'),
					directory(S, 'docs/modules').title('Docs › Modules'),
				]),

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
				]),
			]),
})
