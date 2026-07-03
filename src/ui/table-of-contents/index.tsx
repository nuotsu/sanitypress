import { VscChevronDown } from 'react-icons/vsc'
import { cn } from '@/lib/utils'
import MobileClosedDetails from '@/ui/details/mobile-closed-details'
import ToCItem from './toc-item'
import css from './toc.module.css'

export type ToCHeadings = Array<{
	style: string | null
	text: string | null
}> | null

export default function ({
	summary = 'Table of Contents',
	headings,
	className,
	...props
}: {
	summary?: string
	headings: ToCHeadings
} & React.ComponentProps<'details'>) {
	if (!headings?.length) return null

	return (
		<MobileClosedDetails
			className={cn(
				'table-of-contents accordion max-h-[calc(100svh-var(--header-height)-var(--offset))] overflow-y-auto',
				className,
			)}
			{...props}
		>
			<summary className="bg-background sticky top-0 z-1 py-1 font-bold">
				{summary}
				<VscChevronDown className="md:hidden" />
			</summary>

			<ol className={cn(css.list, 'leading-tight')}>
				{headings?.map((heading, key) => (
					<ToCItem heading={heading} key={key} />
				))}
			</ol>
		</MobileClosedDetails>
	)
}
