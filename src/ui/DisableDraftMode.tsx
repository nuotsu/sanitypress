'use client'

import { useDraftModeEnvironment } from 'next-sanity/hooks'

export default function DisableDraftMode() {
	const environment = useDraftModeEnvironment()

	if (!['live', 'unknown'].includes(environment)) return null

	return (
		<a
			className="action fixed bottom-0 right-4 rounded-b-none text-xs opacity-50 hover:opacity-100"
			href="/api/draft-mode/disable"
		>
			Disable Draft Mode
		</a>
	)
}
