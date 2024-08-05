import uid from '@/lib/uid'
import { stegaClean } from '@sanity/client/stega'

export default function CustomHTML({
	className,
	html,
	...props
}: Partial<{
	className: string
	html: {
		code: string
	}
}> &
	Sanity.Module) {
	if (!html?.code) return null

	return (
		<section
			id={uid(props)}
			className={stegaClean(className)}
			dangerouslySetInnerHTML={{ __html: html.code }}
		/>
	)
}
