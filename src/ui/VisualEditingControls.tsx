import { VisualEditing } from 'next-sanity'
import { draftMode } from 'next/headers'

export default async function VisualEditingControls() {
	const isDraft = (await draftMode()).isEnabled

	return (
		<>
			{isDraft && (
				<>
					<VisualEditing />

					<a
						className="action fixed bottom-0 right-4 rounded-b-none text-xs opacity-50 hover:opacity-100"
						href="/api/disable-draft"
					>
						Disable draft mode
					</a>
				</>
			)}
		</>
	)
}
