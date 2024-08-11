import { Octokit } from 'octokit'

const octokit = new Octokit({
	auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN!,
})

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)

	if (!searchParams.has('repo')) return Response.json({ error: 'Missing repo' })

	const [owner, repo] = searchParams.get('repo')!.split('/')
	const limit = Number(searchParams.get('limit')) || 5

	try {
		const { data: { stargazers_count: count = 0 } = {} } =
			await octokit.rest.repos.get({ owner, repo })

		const { data: avatars } = await octokit.request(
			'GET /repos/{owner}/{repo}/stargazers',
			{
				owner,
				repo,
				per_page: limit * 2,
				page: Math.ceil(count / (limit * 2)),
			},
		)

		return Response.json({
			count,
			avatars: avatars.reverse().slice(0, limit),
		})
	} catch (e) {
		console.error(e)
		return Response.json({ error: 'Failed to fetch repo' })
	}
}
