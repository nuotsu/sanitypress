import { create } from 'zustand'

export const tabbedContentStore = create<{
	active: number
	setActive: (tab: number) => void
}>((set) => ({
	active: 0,
	setActive: (tab) => set({ active: tab }),
}))
