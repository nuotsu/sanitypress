import { create } from 'zustand'

export const categoryStore = create<{
	selected: 'All' | string
	setSelected: (selected: 'All' | string) => void
}>((set) => ({
	selected: 'All',
	setSelected: (selected) =>
		set((state) => ({
			selected: state.selected === selected ? 'All' : selected,
		})),
}))
