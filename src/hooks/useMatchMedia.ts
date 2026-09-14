import { use, useEffect, useState } from 'react'
import { browser } from 'react-dom'

export default function useMatchMedia(query: string) {
	use(browser())

	const [isMatch, setIsMatch] = useState(
		() => window.matchMedia(query).matches,
	)

	useEffect(() => {
		const mq = window.matchMedia(query)
		const handle = () => setIsMatch(mq.matches)
		handle()
		mq.addEventListener('change', handle)
		return () => mq.removeEventListener('change', handle)
	}, [query])

	return isMatch
}

export function useIsDesktop() {
	return useMatchMedia('(pointer: fine), (width >= 48rem)')
}
