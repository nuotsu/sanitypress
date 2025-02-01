'use client'

import { useEffect } from 'react'
import { cn, slug } from '@/lib/utils'
import { stegaClean } from 'next-sanity'
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

		headings?.forEach(({ text }) => {
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
		<details
			className={cn(
				css.root,
				'group accordion max-lg:bg-neutral-100 max-lg:p-3',
			)}
			open
		>
			<summary className="font-bold lg:group-open:after:invisible">
				Table of Contents
			</summary>

			<ol className="anim-fade-to-b mt-2 leading-tight">
				{headings?.map(({ text, style }, key) => (
					<li
						className="border-l border-neutral-200 transition-all"
						data-toc-item={slug(text)}
						key={key}
					>
						<a
							className={cn(
								'block py-1 hover:underline',
								stegaClean(style) == 'h2' && 'pl-4',
								stegaClean(style) == 'h3' && 'pl-6',
								stegaClean(style) == 'h4' && 'pl-8',
								stegaClean(style) == 'h5' && 'pl-10',
								stegaClean(style) == 'h6' && 'pl-12',
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
