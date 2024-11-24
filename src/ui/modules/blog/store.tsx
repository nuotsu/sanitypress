import { useQueryState } from 'nuqs'

export const useCategory = () => {
	const [category, setCategory] = useQueryState('category', {
		defaultValue: 'All',
	})

	return { category, setCategory }
}
