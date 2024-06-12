'use client'

import { useEffect } from 'react'
import { cn, slug } from '@/lib/utils'
import css from './TableOfContents.module.css'

export default function TableOfContents({
	headings,
}: {
	headings?: {
		text: string
		style: string
	}[]
}) {
	useEffect(() => {
		if (typeof document === 'undefined') return

		const headerHeight =
			document.querySelector('body > header')?.clientHeight || 0

		headings?.forEach(({ text, style }) => {
			const target = document.getElementById(slug(text))

			if (!target) return

			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						const tocItem = document.querySelector(
							`[data-toc-item="${slug(text)}"]`,
						)

						if (entry.isIntersecting) {
							tocItem?.classList.add(css.inView)
						} else {
							tocItem?.classList.remove(css.inView)
						}
					})
				},
				{
					rootMargin: `-${headerHeight}px 0px 0px 0px`,
				},
			)

			observer.observe(target)

			return () => observer.disconnect()
		})
	}, [headings])

	return (
		<details className="accordion max-lg:bg-neutral-100 max-lg:p-3" open>
			<summary className="font-bold">Table of Contents</summary>

			<ol className="anim-fade-to-b mt-2 leading-tight">
				{headings?.map(({ text, style }, key) => (
					<li
						className="border-l transition-all"
						data-toc-item={slug(text)}
						key={key}
					>
						<a
							className={cn(
								'block py-1 hover:underline',
								style == 'h2' && 'pl-4',
								style == 'h3' && 'pl-6',
								style == 'h4' && 'pl-8',
								style == 'h5' && 'pl-10',
								style == 'h6' && 'pl-12',
							)}
							href={`#${slug(text)}`}
						>
							{text}
						</a>
					</li>
				))}
			</ol>
		</details>
	)
}
