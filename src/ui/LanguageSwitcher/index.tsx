import {
	languages,
	supportedLanguages,
	type TranslatableSchemaType,
} from '@/lib/i18n'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import Switcher, { type SwitcherProps } from './Switcher'

const SLUG_QUERY = groq`'/' + select(
	metadata.slug.current == 'index' => '',
	metadata.slug.current
)`

export default async function LanguageSwitcher(props: SwitcherProps) {
	if (supportedLanguages.length < 2) {
		return null
	}

	const translations = await fetchSanityLive<Translations[]>({
		query: groq`*[_type in ['page', 'blog.post'] && defined(language)]{
			'slug': ${SLUG_QUERY},
			language,
			'translated': select(
					_type == 'page' => '/' + language + select(
						metadata.slug.current == 'index' => '',
						'/' + metadata.slug.current
					),
					_type == 'blog.post' => '/blog/' + language + ${SLUG_QUERY}
				)
		}`,
		params: {
			defaultLang: languages[0],
		},
	})

	if (!translations) {
		return null
	}

	return <Switcher translations={translations} {...props} />
}

export type Translations = {
	slug: string
	language: TranslatableSchemaType
	translated: string
}
