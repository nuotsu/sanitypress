import { stegaClean } from 'next-sanity'

export default function ({ value }: { value?: string }) {
	if (!value) return null

	return (
		<p className="technical eyebrow text-sm text-current/60">
			{stegaClean(value)}
		</p>
	)
}
