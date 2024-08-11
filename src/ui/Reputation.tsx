import { Octokit } from 'octokit'
import { stegaClean } from '@sanity/client/stega'
import { cn } from '@/lib/utils'
import Img from './Img'

const octokit = new Octokit({
	auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN!,
})

export default async function Reputation({
	reputation,
	className,
}: {
	reputation?: Sanity.Reputation
} & React.HTMLAttributes<HTMLDivElement>) {
	if (!reputation) return null

	const { count, avatars } = await getStargazers(reputation)

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

async function getStargazers(reputation?: Sanity.Reputation) {
	if (!reputation) return {}

	const [owner, repo] = stegaClean(reputation.repo)?.split('/') ?? []
	const limit = Number(stegaClean(reputation.limit)) || 5

	try {
		const { data: { stargazers_count: count = 0 } = {} } =
			await octokit.rest.repos
				.get({ owner, repo })
				.catch(() => ({ data: { stargazers_count: 0 } }))

		const { data: avatars } = await octokit
			.request('GET /repos/{owner}/{repo}/stargazers', {
				owner,
				repo,
				per_page: limit * 2,
				page: Math.ceil(count / (limit * 2)),
			})
			.catch(() => ({ data: [] }))

		return {
			count,
			avatars: avatars.reverse().slice(0, limit) as {
				avatar_url: string
				login: string
			}[],
		}
	} catch (e) {
		console.error(e)
		return {}
	}
}
