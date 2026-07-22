export default function ({
	date,
	...props
}: { date?: string } & React.ComponentProps<'time'>) {
	if (!date) return null

	return (
		<time dateTime={date} {...props}>
			{format(new Date(date.replaceAll('-', '/')))}
		</time>
	)
}

const { format } = new Intl.DateTimeFormat('en-US', {
	dateStyle: 'medium',
})
