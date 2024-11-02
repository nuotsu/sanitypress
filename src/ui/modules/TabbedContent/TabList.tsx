'use client'

import { tabbedContentStore } from './store'
import TabbedContent from '.'
import { cn } from '@/lib/utils'

export default function TabList({
	tabs,
}: React.ComponentProps<typeof TabbedContent>) {
	const { active, setActive } = tabbedContentStore()

	return (
		<nav className="max-md:full-bleed flex overflow-x-auto border-b border-accent">
			{tabs?.map((tab, key) => (
				<button
					className={cn(
						'shrink-0 grow basis-[min(150px,80vw)] rounded-t p-2',
						key === active && 'action rounded-b-none',
					)}
					key={key}
					onClick={() => setActive(key)}
				>
					{tab.label}
				</button>
			))}
		</nav>
	)
}
