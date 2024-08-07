import client from '@/lib/sanity/client'
import type { DashboardWidget, LayoutConfig } from '@sanity/dashboard'
import groq from 'groq'

export function sanitypressGuideWidget(
	config: { layout?: LayoutConfig } = {},
): DashboardWidget {
	return {
		name: 'Guide',
		component: Component,
		layout: config.layout ?? { width: 'auto' },
	}
}

async function Component() {
	const site = await client.fetch<Sanity.Site>(groq`*[_type == 'site'][0]`)

	return (
		<div>
			<h2>{site.title || 'SanityPress'} Info</h2>
		</div>
	)
}
