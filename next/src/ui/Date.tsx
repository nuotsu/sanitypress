export default function ({ value }: { value: string }) {
	if (!value) return null

	const formatted = new Date(value + 'T00:00:00').toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})

	return <time dateTime={value}>{formatted}</time>
}
