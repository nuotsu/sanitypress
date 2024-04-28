import { PortableText } from '@portabletext/react'

export default function FAQList({
	content,
	items,
}: Partial<{
	content: any
	items: {
		question: string
		answer: any
	}[]
}>) {
	return (
		<section
			className="section space-y-4"
			itemScope
			itemType="https://schema.org/FAQPage"
		>
			<header className="richtext text-center">
				<PortableText value={content} />
			</header>

			<div className="mx-auto max-w-screen-md">
				{items?.map(({ question, answer }, key) => (
					<details
						className="accordion border-ink/10 border-b"
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
