import { supportedLanguages } from '@/lib/i18n'
import { getTranslations } from '@/sanity/lib/queries'
import Switcher from './Switcher'
import type { ComponentProps } from 'react'

export default async function LanguageSwitcher(props: ComponentProps<'label'>) {
	if (supportedLanguages.length < 2) return null

	const translations = await getTranslations()
	if (!translations) return null

	return <Switcher translations={translations} {...props} />
}
