'use client'

import { useIsDesktop } from '@/hooks/useMatchMedia'
import BrowserOnly from '@/ui/browser-only'

export default function MobileClosedDetails(
	props: React.ComponentProps<'details'>,
) {
	return (
		<BrowserOnly fallback={<details {...props} />}>
			<MobileClosedDetailsClient {...props} />
		</BrowserOnly>
	)
}

function MobileClosedDetailsClient(props: React.ComponentProps<'details'>) {
	const isDesktop = useIsDesktop()

	return <details open={isDesktop} {...props} />
}
