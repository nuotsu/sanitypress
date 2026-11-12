'use client'

import { useOptimistic } from 'next-sanity/hooks'
import { Fragment } from 'react'

const publishedId = (id: string) =>
	id.replace(/^(drafts\.|versions\.[^.]+\.)/, '')

/**
 * Reorders already-rendered (server) modules by `_key` as soon as Presentation
 * applies an optimistic mutation to the source document's array (e.g. a
 * drag-and-drop), instead of waiting for the Live Content API refetch.
 *
 * Keys missing from `modules` (newly inserted items) are skipped until the
 * refetch renders them; removed items disappear immediately.
 */
export default function OptimisticModules({
	id,
	field,
	keys,
	modules,
}: {
	id: string
	field: string
	keys: string[]
	modules: Record<string, React.ReactNode>
}) {
	const order = useOptimistic<string[], Record<string, unknown>>(
		keys,
		(state, action) => {
			if (action.id !== publishedId(id)) return state

			const items = action.document?.[field] as { _key: string }[] | undefined
			if (!Array.isArray(items)) return state

			const next = items
				.map((item) => item._key)
				.filter((key) => key in modules)

			return next.length === state.length &&
				next.every((key, i) => key === state[i])
				? state
				: next
		},
	)

	return order.map((key) => <Fragment key={key}>{modules[key]}</Fragment>)
}
