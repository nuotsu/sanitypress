import { stegaClean } from '@sanity/client/stega'

export default function ({ htmlId = undefined, _key }: Sanity.Module) {
	return stegaClean(htmlId) || _key
}
