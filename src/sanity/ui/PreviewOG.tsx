'use client'

import { useState } from 'react'
import { BASE_URL } from '@/lib/env'
import { Box, Button, Flex, Popover, Spinner } from '@sanity/ui'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'

export default function PreviewOG({ title }: { title?: string }) {
	const [open, setOpen] = useState(false)

	const url = `${BASE_URL}/api/og?title=${encodeURIComponent(title ?? '')}`

	return (
		<Popover
			style={{ overflow: 'hidden' }}
			constrainSize
			animate
			placement="right-start"
			open={open}
			content={
				<Box style={{ display: 'grid', placeItems: 'center' }}>
					<Flex style={{ gridArea: '1 / 1 / -1 / -1' }}>
						<Spinner muted />
					</Flex>

					<img
						style={{
							gridArea: '1 / 1 / -1 / -1',
							position: 'relative',
							display: 'block',
							width: 300,
							height: 'auto',
						}}
						src={url}
						width={1200}
						height={630}
					/>
				</Box>
			}
		>
			<Button
				mode="bleed"
				padding={2}
				style={{ marginTop: -4 }}
				icon={open ? VscEyeClosed : VscEye}
				title="Preview Open Graph image"
				onClick={() => setOpen((o) => !o)}
			/>
		</Popover>
	)
}
