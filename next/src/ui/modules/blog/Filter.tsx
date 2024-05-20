'use client'

import { categoryStore } from './store'
import Category from './Category'
import { cn } from '@/lib/utils'

export default function Filter({
	label,
	value = 'All',
}: {
	label: string
	value?: 'All' | string
}) {
	const { selected, setSelected } = categoryStore()

	return (
		<button
			className={cn('ghost !py-1', selected === value && 'action')}
			onClick={() => setSelected(value)}
		>
			<Category label={label} />
		</button>
	)
}
