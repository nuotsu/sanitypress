'use client'

import { tabbedContentStore } from './store'
import type { ComponentProps } from 'react'

export default function Wrapper({
	index,
	...props
}: { index: number } & ComponentProps<'article'>) {
	const { active } = tabbedContentStore()

	return <article {...props} hidden={index !== active} />
}
