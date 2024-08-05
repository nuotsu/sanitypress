import uid from '@/lib/uid'
import { stegaClean } from '@sanity/client/stega'

export default function CustomHTML({
	className,
	html,
	...props
}: Partial<
	Sanity.Module & {
		className: string
		html: {
			code: string
		}
	}
>) {
	if (!html?.code) return null

	return (
		<section
			id={uid(props)}
			className={stegaClean(className)}
			dangerouslySetInnerHTML={{ __html: html.code }}
		/>
	)
}
