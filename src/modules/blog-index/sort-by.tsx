'use client'

import { SORT_BY_OPTIONS, useBlogIndexStore } from './store'

export default function () {
	const { setSortBy } = useBlogIndexStore()

	return (
		<label className="flex items-center gap-[.5ch]">
			<span>Sort by:</span>

			<select
				className="ghost cursor-pointer text-left"
				onChange={(e) => setSortBy(e.target.value as any)}
			>
				{SORT_BY_OPTIONS.map((option) => (
					<option value={option.value} key={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</label>
	)
}
