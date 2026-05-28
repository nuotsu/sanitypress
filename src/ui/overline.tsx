import { stegaClean } from 'next-sanity'

export default function ({ value }: { value?: string }) {
	if (!value) return null

	return (
		<p className="technical text-sm text-current/50 overline">
			{stegaClean(value)}
		</p>
	)
}
