'use client'

import { useTabbedContent } from './store'

export default function ({
	index,
	...props
}: { index: number } & React.ComponentProps<'label'>) {
	const { activeTab } = useTabbedContent()

	return (
		<label
			data-active={activeTab === index ? 'true' : undefined}
			onClick={(e) => {
				e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
			}}
			{...props}
		/>
	)
}
