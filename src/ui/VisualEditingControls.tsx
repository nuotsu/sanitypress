import { draftMode } from 'next/headers'
import { SanityLive } from '@/sanity/lib/fetch'
import { VisualEditing } from 'next-sanity'
import DisableDraftMode from './DisableDraftMode'

export default async function VisualEditingControls() {
	return (
		<>
			<SanityLive />

			{(await draftMode()).isEnabled && (
				<>
					<VisualEditing />
					<DisableDraftMode />
				</>
			)}
		</>
	)
}
