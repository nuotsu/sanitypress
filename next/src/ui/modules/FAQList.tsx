import { cn } from '@/lib/utils'
import { PortableText } from '@portabletext/react'

export default function FAQList({
	intro,
	items,
	layout = 'vertical',
}: Partial<{
	intro: any
	items: {
		question: string
		answer: any
		open?: boolean
	}[]
	layout: 'vertical' | 'horizontal'
}>) {
	return (
		<section
			className={cn(
				'section',
				layout === 'horizontal' ? 'grid gap-8 md:grid-cols-2' : 'space-y-8',
			)}
			itemScope
			itemType="https://schema.org/FAQPage"
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
				{items?.map(({ question, answer, open }, key) => (
					<details
						className="accordion border-b border-ink/10"
						open={open}
						itemScope
						itemProp="mainEntity"
						itemType="https://schema.org/Question"
						key={key}
					>
						<summary className="py-4 font-bold" itemProp="name">
							{question}
						</summary>
						<div
							className="anim-fade-to-b pb-4"
							itemScope
							itemProp="acceptedAnswer"
							itemType="https://schema.org/Answer"
						>
							<div className="richtext" itemProp="text">
								<PortableText value={answer} />
							</div>
						</div>
					</details>
				))}
			</div>
		</section>
	)
}
