import { Octokit } from 'octokit'
import { stegaClean } from '@sanity/client/stega'

const octokit = new Octokit({
	auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN!,
})

export default async function (reputation?: Sanity.Reputation) {
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
