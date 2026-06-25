'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'

const TabbedContentContext = createContext<{
	activeTab: number
	setActiveTab: (activeTab: number) => void
} | null>(null)

function useTabbedContent() {
	const ctx = useContext(TabbedContentContext)
	if (!ctx) {
		throw new Error(
			'Tabbed content components must be used within TabbedContentProvider',
		)
	}
	return ctx
}

export function Provider({ children }: { children: React.ReactNode }) {
	const [activeTab, setActiveTab] = useState(0)

	return (
		<TabbedContentContext.Provider value={{ activeTab, setActiveTab }}>
			{children}
		</TabbedContentContext.Provider>
	)
}

export function Label({
	index,
	...props
}: { index: number } & React.ComponentProps<'label'>) {
	const { activeTab } = useTabbedContent()

	return (
		<label data-active={activeTab === index ? 'true' : undefined} {...props} />
	)
}

export function Radio({
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
