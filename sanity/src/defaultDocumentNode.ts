import { Iframe } from 'sanity-plugin-iframe-pane'
import type { DefaultDocumentNodeResolver } from 'sanity/desk'
import type { SanityDocument } from 'sanity'

const dev = process.env.NODE_ENV === 'development'

const defaultDocumentNode: DefaultDocumentNodeResolver = (
	S,
	{ schemaType },
) => {
	switch (schemaType) {
		case 'page':
			return S.document().views([
				S.view.form(),
				S.view
					.component(Iframe)
					.options({
						url: (doc: SanityPage) => {
							const slug = doc?.metadata?.slug?.current
							const path = slug === 'index' ? '' : `/${slug}`
							return dev
								? `http://localhost:3000/${path}`
								: `https://staging--human-marketing.netlify.app/${path}`
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

type SanityPage = SanityDocument & {
	metadata?: { slug?: { current: string } }
}
