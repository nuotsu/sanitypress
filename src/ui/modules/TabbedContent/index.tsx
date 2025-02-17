import Pretitle from '@/ui/Pretitle'
import { PortableText } from 'next-sanity'
import TabList from './TabList'
import Wrapper from './Wrapper'
import CTAList from '@/ui/CTAList'
import Asset from '@/ui/modules/Asset'
import { cn } from '@/lib/utils'

export default function TabbedContent({
	pretitle,
	intro,
	tabs,
}: Partial<{
	pretitle: string
	intro: any
	tabs: Partial<{
		label: string
		pretitle: string
		content: any
		ctas: Sanity.CTA[]
		assets: Array<Sanity.Img | Sanity.Code | Sanity.CustomHTML>
		assetOnRight: boolean
		assetBelowContent: boolean
	}>[]
}>) {
	return (
		<section className="section space-y-8">
			{(pretitle || intro) && (
				<header className="richtext text-center">
					<Pretitle>{pretitle}</Pretitle>
					<PortableText value={intro} />
				</header>
			)}

			<TabList tabs={tabs} />

			{tabs?.map(
				(tab, index) =>
					!!tab && (
						<Wrapper
							className="grid items-center gap-8 *:mx-auto *:max-w-lg md:grid-cols-2 md:gap-x-12"
							index={index}
							key={index}
						>
							<figure
								className={cn(
									'anim-fade-to-r',
									tab.assetOnRight && 'md:anim-fade-to-l md:order-last',
									tab.assetBelowContent && 'max-md:order-last',
								)}
							>
								<Asset asset={tab.assets?.[0]} />
							</figure>

							<div
								className={cn(
									'richtext anim-fade-to-r w-full',
									!tab.assetOnRight && 'md:anim-fade-to-l',
								)}
							>
								<Pretitle>{tab.pretitle}</Pretitle>
								<PortableText value={tab.content} />
								<CTAList ctas={tab.ctas} />
							</div>
						</Wrapper>
					),
			)}
		</section>
	)
}
