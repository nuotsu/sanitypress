'use client'

import { createContext, useContext, useState } from 'react'

const TabbedContentContext = createContext<{
	activeTab: number
	setActiveTab: (activeTab: number) => void
} | null>(null)

export function useTabbedContent() {
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
