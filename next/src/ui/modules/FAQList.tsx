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
			className="section"
			itemScope
			itemType="https://schema.org/FAQPage"
		>
			<header className="richtext">
				<PortableText value={content} />
			</header>

			{items?.map(({ question, answer }, key) => (
				<details
					className="border-b"
					itemScope
					itemProp="mainEntity"
					itemType="https://schema.org/Question"
					key={key}
				>
					<summary itemProp="name">{question}</summary>

					<div
						className="anim-fade-to-b"
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
		</section>
	)
}
