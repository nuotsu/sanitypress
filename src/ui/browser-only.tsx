'use client'

import { Suspense, ViewTransition, type ReactNode } from 'react'

/**
 * Opts a subtree out of SSR via Suspense (callers use `use(browser())`),
 * and skips view transitions so hydration and navigations stay instant.
 */
export default function BrowserOnly({
	fallback,
	children,
}: {
	fallback: ReactNode
	children: ReactNode
}) {
	return (
		<ViewTransition default="none">
			<Suspense fallback={fallback}>{children}</Suspense>
		</ViewTransition>
	)
}
