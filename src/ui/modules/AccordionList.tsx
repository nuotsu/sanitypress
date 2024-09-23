import moduleProps from '@/lib/moduleProps'
import { cn } from '@/lib/utils'
import { PortableText } from 'next-sanity'

export default function AccordionList({
	intro,
	items,
	layout = 'vertical',
	...props
}: Partial<{
	intro: any
	items: {
		summary: string
		content: any
		open?: boolean
	}[]
	layout: 'vertical' | 'horizontal'
}> &
	Sanity.Module) {
	return (
		<section
			className={cn(
				'section',
				layout === 'horizontal' ? 'grid gap-8 md:grid-cols-2' : 'space-y-8',
			)}
			itemScope
			itemType="https://schema.org/FAQPage"
			{...moduleProps(props)}
		>
			<header
				className={cn(
					'richtext',
					layout === 'horizontal'
						? 'md:sticky-below-header self-start [--offset:1rem]'
						: 'text-center',
				)}
			>
				<PortableText value={intro} />
			</header>

			<div className="mx-auto w-full max-w-screen-md">
				{items?.map(({ summary, content, open }, key) => (
					<details
						className="accordion border-b border-ink/10"
						open={open}
						itemScope
						itemProp="mainEntity"
						itemType="https://schema.org/Question"
						key={key}
					>
						<summary className="py-4 font-bold" itemProp="name">
							{summary}
						</summary>

						<div
							className="anim-fade-to-b pb-4"
							itemScope
							itemProp="acceptedAnswer"
							itemType="https://schema.org/Answer"
						>
							<div className="richtext" itemProp="text">
								<PortableText value={content} />
							</div>
						</div>
					</details>
				))}
			</div>
		</section>
	)
}
