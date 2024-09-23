import { Box, Card, Code, Flex, Heading, Label, Stack, Text } from '@sanity/ui'
import pkg from '../../package.json'
import { VscGithubInverted } from 'react-icons/vsc'
import { RiTwitterXLine } from 'react-icons/ri'
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

async function Component() {
	return (
		<Card paddingY={4}>
			<Stack space={4}>
				<Box paddingX={3} as="header">
					<Heading size={1} as="h2">
						<Flex align="flex-end" justify="space-between" wrap="wrap" gap={4}>
							<Flex align="center" gap={2}>
								About SanityPress
								<Code size={1}>v{pkg.version}</Code>
							</Flex>

							<Flex align="center" gap={4}>
								{social.map((item, key) => (
									<a
										style={{ color: 'inherit' }}
										href={item.url}
										target="_blank"
										key={key}
									>
										<item.icon />
									</a>
								))}
							</Flex>
						</Flex>
					</Heading>
				</Box>

				{linkGroups.map((group, i) => (
					<Stack space={3} key={i}>
						<Card borderBottom padding={3}>
							<Label size={0} muted>
								{group.title}
							</Label>
						</Card>

						{group.links.map((link, key) => (
							<Stack space={4} paddingX={3} key={key}>
								<Text size={1}>
									<a href={link.url} target="_blank">
										{link.label}
									</a>
								</Text>
							</Stack>
						))}
					</Stack>
				))}
			</Stack>
		</Card>
	)
}

const social: Array<{
	icon: React.ElementType
	url: string
	label: string
}> = [
	{
		icon: VscGithubInverted,
		url: 'https://github.com/nuotsu/sanitypress',
		label: 'GitHub',
	},
	{
		icon: RiTwitterXLine,
		url: 'https://x.com/nuotsu',
		label: 'X',
	},
]

const linkGroups: Array<{
	title: string
	links: { label: string; url: string }[]
}> = [
	{
		title: 'Resources',
		links: [
			{ label: 'Documentation', url: 'https://sanitypress.dev/docs' },
			{ label: 'The SanityPress Blog', url: 'https://sanitypress.dev/blog' },
			{
				label: 'Sanity.io Articles',
				url: 'https://www.sanity.io/exchange/community/nuotsu',
			},
		],
	},
	{
		title: 'Guides',
		links: [
			{
				label: 'Schema & Modules',
				url: 'https://sanitypress.dev/docs/schema-and-modules',
			},
			{
				label: 'Adding New Modules',
				url: 'https://sanitypress.dev/blog/adding-new-modules',
			},
			{
				label: 'Live Module Examples',
				url: 'https://sanitypress.dev/playground',
			},
			{
				label: 'Useful GROQ Queries',
				url: 'https://sanitypress.dev/blog/get-ridiculously-organized-quickly-with-groq',
			},
			{
				label: 'A Guide for Nested Routes',
				url: 'https://sanitypress.dev/blog/a-guide-for-nested-routes',
			},
			{
				label: 'Time-based revalidation',
				url: 'https://sanitypress.dev/docs/time-based-revalidation',
			},
		],
	},
	{
		title: 'GitHub',
		links: [
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
