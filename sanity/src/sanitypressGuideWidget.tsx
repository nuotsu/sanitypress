import { Box, Card, Code, Flex, Heading, Label, Stack, Text } from '@sanity/ui'
import pkg from '../../package.json'
import type { DashboardWidget, LayoutConfig } from '@sanity/dashboard'

export function sanitypressGuideWidget(
	config: { layout?: LayoutConfig } = {},
): DashboardWidget {
	return {
		name: 'Guide',
		component: Component,
		layout: config.layout ?? { width: 'medium' },
	}
}

const groups: Array<{
	title: string
	links: { label: string; url: string }[]
}> = [
	{
		title: 'Resources',
		links: [
			{ label: 'Documentation', url: 'https://sanitypress.dev/docs' },
			{
				label: 'Schema & Modules',
				url: 'https://sanitypress.dev/docs/schema-and-modules',
			},
			{
				label: 'Modules Playground',
				url: 'https://sanitypress.dev/playground',
			},
			{
				label: 'Time-based revalidation',
				url: 'https://sanitypress.dev/docs/time-based-revalidation',
			},
		],
	},
	{
		title: 'Guides',
		links: [
			{ label: 'The SanityPress Blog', url: 'https://sanitypress.dev/blog' },
			{
				label: 'Adding New Modules',
				url: 'https://sanitypress.dev/blog/adding-new-modules',
			},
			{
				label: 'Adding Jump Links to Modules',
				url: 'https://sanitypress.dev/blog/adding-jump-links-to-modules',
			},
			{
				label: 'A Guide for Nested Routes',
				url: 'https://sanitypress.dev/blog/a-guide-for-nested-routes',
			},
		],
	},
	{
		title: 'GitHub',
		links: [
			{ label: 'README', url: 'https://github.com/nuotsu/sanitypress' },
			{
				label: 'Changelog',
				url: 'https://github.com/nuotsu/sanitypress/releases',
			},
			{
				label: 'Discussions',
				url: 'https://github.com/nuotsu/sanitypress/discussions',
			},
		],
	},
]

async function Component() {
	return (
		<Card paddingY={4}>
			<Stack space={4}>
				<Box paddingX={3} as="header">
					<Heading size={1} as="h2">
						<Flex align="center" gap={2}>
							About SanityPress
							<Code size={1}>v{pkg.version}</Code>
						</Flex>
					</Heading>
				</Box>

				{groups.map((group, i) => (
					<Stack space={3} key={i}>
						<Card borderBottom padding={3}>
							<Label size={0} muted>
								{group.title}
							</Label>
						</Card>

						{group.links.map((link, key) => (
							<Stack space={4} paddingX={3} key={key}>
								<Text size={1}>
									<a href={link.url}>{link.label}</a>
								</Text>
							</Stack>
						))}
					</Stack>
				))}
			</Stack>
		</Card>
	)
}
