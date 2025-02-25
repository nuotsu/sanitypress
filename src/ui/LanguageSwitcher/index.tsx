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

export async function getTranslations() {
	return await fetchSanityLive<Translation[]>({
		query: groq`*[_type in ['page', 'blog.post'] && defined(language)]{
			'slug': '/' + select(
				_type == 'blog.post' => 'blog/' + metadata.slug.current,
				metadata.slug.current != 'index' => metadata.slug.current,
				''
			),
			'translations': *[_type == 'translation.metadata' && references(^._id)].translations[].value->{
				'slug': '/' + select(
					_type == 'blog.post' => 'blog/' + language + '/' + metadata.slug.current,
					metadata.slug.current != 'index' => language + '/' + metadata.slug.current,
					language
				),
				language
			}
		}`,
	})
}

export type Translation = Partial<{
	slug: string
	translations: {
		slug: string
		language: string
	}[]
}>
