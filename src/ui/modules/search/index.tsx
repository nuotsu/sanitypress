import { PortableText } from 'next-sanity'
import SearchForm from './SearchForm'

export default function SearchModule({ content }: Partial<{ content: any }>) {
	return (
		<section className="section">
			{content && (
				<header className="richtext text-center">
					<PortableText value={content} />
				</header>
			)}

			<SearchForm className="mx-auto max-w-screen-md" />
		</section>
	)
}
