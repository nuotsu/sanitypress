export default function ReadTime({
	value,
	...props
}: { value: number } & React.ComponentProps<'span'>) {
	const minutes = Math.ceil(value)

	return (
		<span {...props}>
			Read time: {minutes} {minutes === 1 ? 'minute' : 'minutes'}
		</span>
	)
}
