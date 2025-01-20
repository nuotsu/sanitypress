import moduleProps from '@/lib/moduleProps'
import { stegaClean } from 'next-sanity'
import WithScript from './WithScript'

export default function CustomHTML({
	className,
	html,
	...props
}: Partial<
	{
		className: string
		html: {
			code: string
		}
	} & Sanity.Module
>) {
	if (!html?.code) return null

	return html.code.includes('<script') ? (
		<WithScript
			code={stegaClean(html.code)}
			className={stegaClean(className)}
			{...props}
		/>
	) : (
		<section
			className={stegaClean(className)}
			{...moduleProps(props)}
			dangerouslySetInnerHTML={{ __html: stegaClean(html.code) }}
		/>
	)
}
