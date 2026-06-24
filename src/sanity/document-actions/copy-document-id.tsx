'use client'

import { type DocumentActionComponent } from 'sanity'
import { DocumentSheetIcon } from '@sanity/icons'
import { useToast } from '@sanity/ui'

export const copyDocumentIdAction: DocumentActionComponent = (props) => {
	const toast = useToast()

	// Copy the raw `_id` as-is (keeps the `drafts.` prefix while editing a draft)
	const rawId = props.draft?._id ?? props.published?._id ?? props.id

	return {
		label: 'Copy document ID',
		icon: DocumentSheetIcon,
		onHandle: async () => {
			try {
				await navigator.clipboard.writeText(rawId)
				toast.push({
					status: 'success',
					title: 'Document ID copied',
					description: rawId,
				})
			} catch {
				toast.push({ status: 'error', title: 'Could not copy document ID' })
			}

			props.onComplete()
		},
	}
}
