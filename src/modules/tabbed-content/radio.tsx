'use client'

import { useEffect, useRef } from 'react'
import { useTabbedContent } from './store'

export default function ({
	index,
	...props
}: { index: number } & React.ComponentProps<'input'>) {
	const ref = useRef<HTMLInputElement>(null)

	const { activeTab, setActiveTab } = useTabbedContent()

	useEffect(() => {
		if (ref.current) {
			ref.current.checked = activeTab === index
		}
	}, [activeTab, index])

	return (
		<input
			ref={ref}
			type="radio"
			onChange={(e) => setActiveTab(Number(e.currentTarget.value))}
			className="sr-only"
			{...props}
		/>
	)
}
