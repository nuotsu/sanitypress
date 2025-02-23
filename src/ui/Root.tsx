'use client'

import getLang from '@/lib/getLang'
import type { ComponentProps } from 'react'

export default function Root(props: ComponentProps<'html'>) {
	const lang = getLang()

	return <html lang={lang} {...props} />
}
