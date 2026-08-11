import { PortableText } from 'next-sanity'
import { Module } from '@/modules'
import {
	getDynamicFetchOptions,
	type DynamicFetchOptions,
} from '@/sanity/lib/live'
import { getSite } from '@/sanity/lib/queries'
import type { Cta } from '@/sanity/types'
import CTAList from '@/ui/cta-list'
import ElementHeight from '@/ui/element-height'

export async function DynamicAnnouncement() {
	const { perspective, stega } = await getDynamicFetchOptions()
	return <CachedAnnouncement perspective={perspective} stega={stega} />
}

export default async function Announcement(props: DynamicFetchOptions) {
	return <CachedAnnouncement {...props} />
}

async function CachedAnnouncement({ perspective, stega }: DynamicFetchOptions) {
	'use cache'
	const site = await getSite({ perspective, stega })
	const announcement = site?.announcement

	if (!announcement) return null

	return (
		<Module
			as={ElementHeightAside}
			_type={announcement._type}
			_key={announcement._id}
			attributes={announcement.attributes}
			className="bg-foreground text-background"
		>
			<div className="section flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-2 text-center text-sm">
				{announcement.content && (
					<div className="prose">
						<PortableText value={announcement.content} />
					</div>
				)}

				<CTAList ctas={announcement.ctas as Cta[]} />
			</div>
		</Module>
	)
}

function ElementHeightAside(props: React.ComponentProps<typeof ElementHeight>) {
	return <ElementHeight as="aside" cssVar="--announcement-height" {...props} />
}
