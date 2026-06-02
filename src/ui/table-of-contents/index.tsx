import { VscChevronDown } from 'react-icons/vsc'
import { cn } from '@/lib/utils'
import ToCItem from './toc-item'
import css from './toc.module.css'

export default function ({
	summary = 'Table of Contents',
	headings,
	className,
	...props
}: {
	summary?: string
	headings: Array<{
		style: string | null
		text: string | null
	}> | null
} & React.ComponentProps<'details'>) {
	if (!headings?.length) return null

	return (
		<details
			className={cn(
				'accordion max-h-[calc(100svh-var(--header-height)-var(--offset))] overflow-y-auto',
				className,
			)}
			{...props}
		>
			<summary className="md:bg-background sticky top-0 font-bold">
				{summary}
				<VscChevronDown className="md:hidden" />
			</summary>

			<ol className={cn(css.list, 'leading-tight')}>
				{headings?.map((heading, key) => (
					<ToCItem heading={heading} key={key} />
				))}
			</ol>
		</details>
	)
}
