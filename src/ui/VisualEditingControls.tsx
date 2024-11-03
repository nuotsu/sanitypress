import { draftMode } from 'next/headers'
import { SanityLive } from '@/lib/sanity/fetch'
import { VisualEditing } from 'next-sanity'
import { DisableDraftMode } from './DisableDraftMode'

export default async function VisualEditingControls() {
	return (
		<>
			{(await draftMode()).isEnabled && (
				<>
					<SanityLive />
					<VisualEditing />
					<DisableDraftMode />
				</>
			)}
		</>
	)
}
