import uid from '@/lib/uid'

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
			className={className}
			dangerouslySetInnerHTML={{ __html: html.code }}
		/>
	)
}
