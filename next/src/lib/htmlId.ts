import { stegaClean } from '@sanity/client/stega'

export default function ({ htmlId = undefined, _key }: Sanity.Module) {
	return {
		id: stegaClean(htmlId) || _key,
	}
}
