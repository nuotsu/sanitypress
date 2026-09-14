'use client'

import { useIsDesktop } from '@/hooks/useMatchMedia'
import BrowserOnly from '@/ui/browser-only'

/**
 * @description - Details functionality that works only on mobile
 */
export default function MobileOnlyDetails(
	props: React.ComponentProps<'details'>,
) {
	return (
		<BrowserOnly fallback={<details {...props} />}>
			<MobileOnlyDetailsClient {...props} />
		</BrowserOnly>
	)
}

function MobileOnlyDetailsClient({
	name,
	...props
}: React.ComponentProps<'details'>) {
	const isDesktop = useIsDesktop()

	const detailsProps: React.ComponentProps<'details'> = isDesktop
		? {
				open: true,
				onClick: (e) => {
					const target = e.target as HTMLElement

					if (target.closest('a, button')) return

					e.preventDefault()
				},
			}
		: { name }

	return <details {...props} {...detailsProps} />
}
