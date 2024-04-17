import { isDev, type SanityDocument } from 'sanity'
import { Iframe } from 'sanity-plugin-iframe-pane'
import type { DefaultDocumentNodeResolver } from 'sanity/structure'

const previewUrl = 'https://next-sanity-starter-template.vercel.app'

const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
	switch (schemaType) {
		case 'page':
		case 'blog.post':
			return S.document().views([
				S.view.form(),
				S.view
					.component(Iframe)
					.options({
						url: (doc: SanityDocument & { metadata?: { slug?: { current: string } } }) => {
							const domain = isDev
								? 'http://localhost:3000'
								: previewUrl

							const slug = doc?.metadata?.slug?.current
							const path = slug === 'index' ? '' : slug
							const directory = schemaType === 'blog.post' ? 'blog' : null

							return [domain, directory, path].filter(Boolean).join('/')
						},
						reload: {
							button: true,
						},
					})
					.title('Preview'),
			])

		default:
			return S.document().views([S.view.form()])
	}
}

export default defaultDocumentNode
