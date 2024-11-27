'use client'

import { useEffect, useState } from 'react'

export default function Scheduler({
	start,
	end,
	children,
}: Partial<{
	start: string
	end: string
	children: React.ReactNode
}>) {
	if (!start && !end) return children

	function checkActive() {
		const now = new Date()
		return (!start || new Date(start) < now) && (!end || new Date(end) > now)
	}

	const [isActive, setIsActive] = useState(checkActive())

	useEffect(() => {
		const interval = setInterval(() => setIsActive(checkActive()), 1000) // check every second
		return () => clearInterval(interval)
	}, [])

	if (!isActive) return null

	return children
}
