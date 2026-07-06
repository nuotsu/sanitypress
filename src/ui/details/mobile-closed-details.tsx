'use client'

import { useIsDesktop } from '@/hooks/useMatchMedia'

export default function (props: React.ComponentProps<'details'>) {
	const isDesktop = useIsDesktop()

	return <details open={isDesktop} {...props} />
}
