'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import ElementHeight from '@/ui/element-height'

export default function (props: React.ComponentPropsWithoutRef<'header'>) {
	const pathname = usePathname()

	// close mobile menu after navigation
	useEffect(() => {
		if (typeof document === 'undefined') return
		const toggle = document.querySelector('#header-open') as HTMLInputElement
		if (toggle) toggle.checked = false
	}, [pathname])

	return (
		<ElementHeight
			as="header"
			cssVar="--header-height"
			role="banner"
			{...props}
		/>
	)
}
