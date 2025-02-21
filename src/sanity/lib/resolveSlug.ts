export default function resolveSlug({
	_type,
	parent1,
	parent2,
	parent3,
	internal,
	params,
	external,
}: {
	// internal
	_type?: string
	parent1?: string
	parent2?: string
	parent3?: string
	internal?: string
	params?: string
	// external
	external?: string
}) {
	if (external) return external

	if (internal) {
		const segment = _type === 'blog.post' ? '/blog/' : '/'
		const path = internal === 'index' ? null : internal

		return [
			segment,
			parent1
				? [parent1, parent2, parent3, path].filter(Boolean).join('/')
				: path,
			params,
		]
			.filter(Boolean)
			.join('')
	}

	return undefined
}
