import { useQueryState } from 'nuqs'

export const useBlogFilters = () => {
	const [category, setCategory] = useQueryState('category', {
		defaultValue: 'All',
	})

	const [author, setAuthor] = useQueryState('author')

	return {
		category,
		author,
		setCategory,
		setAuthor,
	}
}
