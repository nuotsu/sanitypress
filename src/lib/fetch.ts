import dev from './env'

const BASE_URL = dev ? 'http://localhost:3000' : ''

export async function fetchAPI<T = any>(
	endpoint: string,
	{
		params,
		next,
	}: {
		params?: Record<string, any>
		next?: RequestInit['next']
	} = {},
) {
	const url = new URL(`/api${endpoint}`, BASE_URL)

	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			url.searchParams.set(key, value)
		})
	}

	const res = await fetch(url.toString(), {
		next: {
			revalidate: dev ? 0 : 3600,
			...next,
		},
	})

	return (await res.json()) as T
}
