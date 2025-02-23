import { DEFAULT_LANG, supportedLanguages } from '@/lib/i18n'
import { fetchSanityLive } from '@/sanity/lib/fetch'
import { groq } from 'next-sanity'
import Switcher from './Switcher'
import type { ComponentProps } from 'react'

export default async function LanguageSwitcher(props: ComponentProps<'label'>) {
	if (supportedLanguages.length < 2) return null

	const translations = await getTranslations()
	if (!translations) return null

	return <Switcher translations={translations} {...props} />
}

export type Translation = {
	slug: string
	language: string
	translated: string
}

const SLUG_QUERY = groq`'/' + select(
	metadata.slug.current == 'index' => '',
	metadata.slug.current
)`

export async function getTranslations() {
	return await fetchSanityLive<Translation[]>({
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
			defaultLang: DEFAULT_LANG,
		},
	})
}
