import { twMerge } from 'tailwind-merge'
import CTA from './CTA'

export default function CTAList({ ctas, className }: Props) {
	return (
		<p
			className={twMerge(
				'flex flex-wrap items-center gap-x-4 gap-y-2',
				className,
			)}
		>
			{ctas?.map((cta, key) => <CTA {...cta} key={key} />)}
		</p>
	)
}

type Props = React.HTMLAttributes<HTMLParagraphElement> & {
	ctas?: Sanity.CTA[]
}
