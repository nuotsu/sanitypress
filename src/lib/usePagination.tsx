'use client'

import { useQueryState, parseAsInteger } from 'nuqs'

type PaginationProps = React.ComponentProps<'div'> &
	Partial<{
		buttonClassName: string
		prevClassName: string
		nextClassName: string
		prev: React.ReactNode
		next: React.ReactNode
		hidePage: boolean
		onClick: () => void
	}>

type UsePaginationReturnProps<T> = {
	atStart: boolean
	atEnd: boolean
	onPrev: () => void
	onNext: () => void
	paginatedItems: T[]
	Pagination: (props: PaginationProps) => React.ReactNode
	currentPage: number
	totalPages: number
}

export function usePagination<T>({
	items = [],
	itemsPerPage = 3,
}: {
	items: T[]
	itemsPerPage?: number
}) {
	const { page, setPage } = usePageState()

	const atStart = page === 1
	const atEnd = page === Math.ceil(items.length / itemsPerPage)

	const onPrev = () => setPage(Math.max(1, page - 1))
	const onNext = () =>
		setPage(Math.min(Math.ceil(items.length / itemsPerPage), page + 1))

	const paginatedItems = items.slice(
		itemsPerPage * (page - 1),
		itemsPerPage * page,
	)

	const currentPage = page
	const totalPages = Math.ceil(items.length / itemsPerPage)

	const Pagination = ({
		buttonClassName,
		prevClassName,
		nextClassName,
		prev = 'Prev',
		next = 'Next',
		hidePage,
		onClick = () => {},
		...props
	}: PaginationProps) => {
		if ((atStart && atEnd) || !paginatedItems?.length) return null

		return (
			<nav {...props}>
				<button
					className={prevClassName || buttonClassName}
					onClick={() => {
						onPrev()
						onClick()
					}}
					disabled={atStart}
				>
					{prev}
				</button>

				{!hidePage && (
					<span>
						{currentPage} of {totalPages}
					</span>
				)}

				<button
					className={nextClassName || buttonClassName}
					onClick={() => {
						onNext()
						onClick()
					}}
					disabled={atEnd}
				>
					{next}
				</button>
			</nav>
		)
	}

	return {
		atStart,
		atEnd,
		onPrev,
		onNext,
		paginatedItems,
		Pagination,
		currentPage,
		totalPages,
	} satisfies UsePaginationReturnProps<T>
}

export function usePageState() {
	const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
	return { page, setPage }
}
