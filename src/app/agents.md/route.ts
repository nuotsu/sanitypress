import { getAgentDirections } from '@/lib/agent-directions'

export async function GET() {
	const body = await getAgentDirections()

	return new Response(body, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	})
}
