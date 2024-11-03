'use client'

import { useDraftModeEnvironment } from 'next-sanity/hooks'

export function DisableDraftMode() {
	const environment = useDraftModeEnvironment()

	// Only show the disable draft mode button when outside of Presentation Tool
	if (environment !== 'live' && environment !== 'unknown') {
		return null
	}

	return (
		<a
			href="/api/draft-mode/disable"
			className="action fixed bottom-0 right-4 rounded-b-none text-xs opacity-50 hover:opacity-100"
		>
			Disable Draft Mode
		</a>
	)
}
