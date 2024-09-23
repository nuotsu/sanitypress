export default function ReadTime({ value }: { value: number }) {
	const minutes = Math.ceil(value)

	return (
		<span className="with-icon gap-1">
			Read time: {minutes} {minutes === 1 ? 'minute' : 'minutes'}
		</span>
	)
}
