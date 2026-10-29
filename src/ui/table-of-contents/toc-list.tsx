'use client'

import { useEffect, useRef, type ComponentProps } from 'react'
import css from './toc.module.css'

/**
 * @description Marks each item whose heading has scrolled above the middle of the viewport, using one shared observer
 */
export default function ToCList(props: ComponentProps<'ol'>) {
	const ref = useRef<HTMLOListElement>(null)

	useEffect(() => {
		const list = ref.current
		if (!list) return

		const scope = list.closest('[data-module]') ?? document
		const items = new Map<Element, HTMLLIElement>()

		for (const link of list.querySelectorAll<HTMLAnchorElement>(
			'li > a[href^="#"]',
		)) {
			const target = scope.querySelector(`#${CSS.escape(link.hash.slice(1))}`)
			if (target) items.set(target, link.parentElement as HTMLLIElement)
		}

		let observer: IntersectionObserver | undefined

		function observe() {
			observer?.disconnect()
			observer = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						items
							.get(entry.target)
							?.classList.toggle(css.inView, entry.isIntersecting)
					}
				},
				{
					threshold: 1,
					// threshold height = 1/2 of viewport
					rootMargin: `${document.documentElement.scrollHeight}px 0px -${window.innerHeight / 2}px 0px`,
				},
			)
			for (const target of items.keys()) observer.observe(target)
		}

		observe()
		window.addEventListener('resize', observe)

		return () => {
			window.removeEventListener('resize', observe)
			observer?.disconnect()
		}
	}, [])

	return <ol ref={ref} {...props} />
}
