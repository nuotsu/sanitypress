import { stegaClean } from '@sanity/client/stega'
import { cn } from '@/lib/utils'
import Img from './Img'
import { fetchAPI } from '@/lib/fetch'

export default async function Reputation({
	reputation,
	className,
}: {
	reputation?: Sanity.Reputation
} & React.HTMLAttributes<HTMLDivElement>) {
	if (!reputation) return null

	const { count, avatars } = await fetchAPI<{
		error?: string
		count?: number
		avatars?: { avatar_url: string; login: string }[]
	}>('/stargazers', {
		params: {
			repo: stegaClean(reputation.repo),
			limit: reputation.limit,
		},
		next: {
			revalidate: 3600,
			tags: ['stargazers'],
		},
	})

	const imgClassname = cn(
		'aspect-square h-8 w-auto rounded-full border-2 border-canvas object-cover -mr-2 last:mr-0',
	)

	return (
		<div
			className={cn('flex flex-wrap items-center gap-x-6 gap-y-2', className)}
		>
			<figure className="flex empty:hidden">
				{!!avatars?.length
					? avatars.map(
							(avatar, key) =>
								!!avatar && (
									<img
										className={imgClassname}
										src={avatar.avatar_url}
										alt={avatar.login}
										key={key}
									/>
								),
						)
					: reputation.avatars
							?.slice(0, reputation.limit || 5)
							?.map((avatar, key) => (
								<Img
									className={imgClassname}
									image={avatar}
									imageWidth={96}
									key={key}
								/>
							))}
			</figure>

			<div className="grid text-left [figure:empty+&]:text-center">
				<strong className="text-yellow-700">
					{reputation.title || (!!count ? `⭐ ${count} stars` : '★★★★★')}
				</strong>

				{reputation.subtitle && <small>{reputation.subtitle}</small>}
			</div>
		</div>
	)
}
