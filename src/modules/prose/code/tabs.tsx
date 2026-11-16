'use client'

import { useEffect, useId, useState } from 'react'
import { cn } from '@/lib/utils'
import {
	CopyButton,
	Filename,
	frameClassName,
	Highlighted,
	menuClassName,
} from './frame'

type Attr = { 'data-sanity'?: string }

type Tab = {
	key: string
	label: string
	labelAttr: Attr
	code: string
	codeAttr: Attr
	html: string
	filename?: string
	filenameAttr: Attr
}

const EVENT = 'code-group:change'
const storageKey = (syncKey: string) => `code-group:${syncKey}`

export default function ({
	tabs,
	syncKey,
	dark,
	className,
}: {
	tabs: Tab[]
	syncKey?: string
	dark: boolean
	className?: string
}) {
	const id = useId()
	const [active, setActive] = useState(0)

	// Groups sharing a `syncKey` follow each other by label, and remember the last choice
	useEffect(() => {
		if (!syncKey) return

		const select = (label?: string | null) => {
			const index = tabs.findIndex((tab) => tab.label === label)
			if (index >= 0) setActive(index)
		}

		try {
			select(localStorage.getItem(storageKey(syncKey)))
		} catch {}

		const onChange = (e: Event) => {
			const { detail } = e as CustomEvent<{ syncKey: string; label: string }>
			if (detail.syncKey === syncKey) select(detail.label)
		}

		window.addEventListener(EVENT, onChange)
		return () => window.removeEventListener(EVENT, onChange)
	}, [syncKey, tabs])

	function choose(index: number) {
		setActive(index)
		if (!syncKey) return

		const { label } = tabs[index]
		try {
			localStorage.setItem(storageKey(syncKey), label)
		} catch {}
		window.dispatchEvent(new CustomEvent(EVENT, { detail: { syncKey, label } }))
	}

	const current = tabs[active] ?? tabs[0]

	return (
		<article className={cn(frameClassName, className)} data-module="code-group">
			<menu className={menuClassName}>
				<li className="no-scrollbar flex shrink-0 self-stretch overflow-x-auto">
					<div role="tablist" className="flex">
						{tabs.map((tab, i) => (
							<button
								key={tab.key}
								type="button"
								role="tab"
								id={`${id}-tab-${i}`}
								aria-selected={i === active}
								aria-controls={`${id}-panel-${i}`}
								className={cn(
									'border-b-2 border-transparent px-4 transition-opacity',
									i === active
										? 'border-current'
										: 'opacity-50 hover:opacity-80',
								)}
								onClick={() => choose(i)}
								{...tab.labelAttr}
							>
								{tab.label}
							</button>
						))}
					</div>
				</li>

				{current.filename !== current.label && (
					<Filename
						value={current.filename}
						className="text-background/70"
						{...current.filenameAttr}
					/>
				)}

				<CopyButton value={current.code} dark={dark} />
			</menu>

			{tabs.map((tab, i) => (
				<Highlighted
					key={tab.key}
					html={tab.html}
					role="tabpanel"
					id={`${id}-panel-${i}`}
					aria-labelledby={`${id}-tab-${i}`}
					hidden={i !== active}
					{...tab.codeAttr}
				/>
			))}
		</article>
	)
}
