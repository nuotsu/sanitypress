export default function ReadTime({ value }: { value: number }) {
	return (
		<span className="with-icon gap-1">
			Read time: {Math.ceil(value)} minutes
		</span>
	)
}
