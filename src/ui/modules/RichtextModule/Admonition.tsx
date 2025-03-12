import { cn } from '@/lib/utils'
import { PortableText } from 'next-sanity'
import { VscInfo, VscLightbulb, VscReport, VscWarning } from 'react-icons/vsc'

export default function Admonition({
	value,
}: {
	value: Partial<{
		title: string
		content: any
		tone: 'note' | 'important' | 'tip' | 'warning' | 'caution'
	}>
}) {
	if (!value) return null

	const { title, content, tone } = value

	const color = tone
		? {
				note: 'border-blue-500 bg-blue-500/5 [&_svg]:text-blue-600',
				important: 'border-purple-500 bg-purple-500/5 [&_svg]:text-purple-600',
				tip: 'border-green-500 bg-green-500/5 [&_svg]:text-green-600',
				warning: 'border-yellow-500 bg-yellow-500/5 [&_svg]:text-yellow-500',
				caution: 'border-red-500 bg-red-500/5 [&_svg]:text-red-500',
			}[tone]
		: 'border-neutral-400 bg-neutral-500/5'

	const Icon = tone
		? {
				note: VscInfo,
				important: VscReport,
				tip: VscLightbulb,
				warning: VscWarning,
				caution: VscWarning,
			}[tone]
		: null

	return (
		<dl className={cn('space-y-2 border-s-2 px-4 py-3', color)}>
			<dt className="flex items-center gap-2 font-bold">
				{Icon && <Icon className="size-5" />}
				<div>{title}</div>
			</dt>

			<dd>
				<PortableText value={content} />
			</dd>
		</dl>
	)
}
