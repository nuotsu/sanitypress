import { PortableText } from 'next-sanity'
import SearchForm from './SearchForm'
import type { SearchScope } from './store'

export default function SearchModule({
	content,
	scope,
}: Partial<{
	content: any
	scope: SearchScope
}>) {
	return (
		<section className="section space-y-8">
			{content && (
				<header className="richtext text-center">
					<PortableText value={content} />
				</header>
			)}

			<SearchForm className="mx-auto max-w-screen-sm" scope={scope} />
		</section>
	)
}
