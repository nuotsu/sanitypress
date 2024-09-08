'use client'

import { useState, type ComponentProps } from 'react'

type PaginationProps = ComponentProps<'div'> &
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
	resetPage: () => void
	paginatedItems: T[]
	Pagination: (props: PaginationProps) => React.ReactNode
	currentPage: number
	totalPages: number
}

export default function usePagination<T>({
	items = [],
	itemsPerPage = 3,
}: {
	items: T[]
	itemsPerPage?: number
}): UsePaginationReturnProps<T> {
	const [$page, set$page] = useState(0)

	const atStart = $page === 0
	const atEnd = $page === Math.ceil(items.length / itemsPerPage) - 1

	const onPrev = () => set$page(Math.max(0, $page - 1))
	const onNext = () =>
		set$page(Math.min(Math.ceil(items.length / itemsPerPage) - 1, $page + 1))
	const resetPage = () => set$page(0)

	const paginatedItems = items.slice(
		itemsPerPage * $page,
		itemsPerPage * ($page + 1),
	)

	const currentPage = $page + 1
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
		resetPage,
		paginatedItems,
		Pagination,
		currentPage,
		totalPages,
	}
}
