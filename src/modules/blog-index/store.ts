import { useQueryState } from 'nuqs'

export const SORT_BY_OPTIONS = [
	{ label: 'Publish date (newest first)', value: 'publishDate_desc' },
	{ label: 'Publish date (oldest first)', value: 'publishDate_asc' },
	{ label: 'Title (A-Z)', value: 'title_asc' },
	{ label: 'Title (Z-A)', value: 'title_desc' },
]

export function useBlogIndexStore() {
	const [categoryParam, setCategoryParam] = useQueryState('category', {
		defaultValue: '',
	})

	const [sortBy, setSortBy] = useQueryState('sortBy', {
		defaultValue: SORT_BY_OPTIONS[0].value,
	})

	return {
		categoryParam,
		setCategoryParam,
		sortBy,
		setSortBy,
	}
}
