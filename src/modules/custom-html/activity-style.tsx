'use client'

/**
 * Next.js keeps previously visited pages mounted (hidden via `<Activity>`), so
 * a plain `<style>` would keep applying after navigating away. Disable the
 * stylesheet while hidden and re-enable it when the page is visible again.
 * @see node_modules/next/dist/docs/01-app/02-guides/preserving-ui-state.md#global-styles
 */
export default function ({ css }: { css: string }) {
	return (
		<style
			ref={(style) => {
				if (style) style.media = ''
				return () => {
					if (style) style.media = 'not all'
				}
			}}
		>
			{css}
		</style>
	)
}
