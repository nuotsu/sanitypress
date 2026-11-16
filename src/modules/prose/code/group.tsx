import { stegaClean } from 'next-sanity'
import type { ComponentProps } from 'react'
import { stegaToAttribute } from '@/lib/stega'
import type { CodeGroup } from '@/sanity/types'
import CodeGroupTabs from './tabs'
import { highlight, type CodeTheme } from './highlight'

export default async function ({
	value,
	theme = 'github-dark-high-contrast',
	className,
}: {
	theme?: CodeTheme
	value?: CodeGroup
} & ComponentProps<'article'>) {
	const tabs = await Promise.all(
		(value?.tabs ?? [])
			.filter((tab) => tab.code?.code)
			.map(async (tab) => {
				const highlighted = await highlight(tab.code!, theme)
				const { cleaned: label, attr: labelAttr } = stegaToAttribute(tab.label)

				return {
					...highlighted,
					key: tab._key,
					label:
						label ||
						highlighted.filename?.split('/').pop() ||
						stegaClean(tab.code?.language) ||
						'Code',
					labelAttr,
				}
			}),
	)

	if (!tabs.length) return null

	return (
		<CodeGroupTabs
			tabs={tabs}
			syncKey={stegaClean(value?.syncKey)}
			dark={!theme.includes('light')}
			className={className}
		/>
	)
}
