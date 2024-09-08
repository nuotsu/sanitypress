'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { categoryStore } from '../store'
import Category from '../Category'
import { cn } from '@/lib/utils'
import css from './FilterList.module.css'

export default function Filter({
	label,
	value = 'All',
}: {
	label: string
	value?: 'All' | string
}) {
	const { selected, setSelected, reset } = categoryStore()

	useEffect(reset, [usePathname()])

	return (
		<button
			className={cn(
				css.filter,
				'!py-1',
				selected === value
					? 'action *:text-white/50'
					: 'ghost border border-transparent',
			)}
			onClick={() => setSelected(value)}
		>
			<Category label={label} />
		</button>
	)
}
