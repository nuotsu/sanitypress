import type { PreviewProps } from 'sanity'
import { Badge, Box, Flex, Text } from '@sanity/ui'
import { VscEyeClosed } from 'react-icons/vsc'

export default function (
	props: PreviewProps & { hidden?: boolean; uid?: string },
) {
	const render = props.renderDefault(props)

	return (
		<Flex align="center">
			<Box flex={1}>{render}</Box>

			{props.hidden ? (
				<Badge padding={2} marginRight={2}>
					<VscEyeClosed />
				</Badge>
			) : (
				props.uid && (
					<Badge size={0} marginRight={2}>
						#{props.uid}
					</Badge>
				)
			)}
		</Flex>
	)
}
