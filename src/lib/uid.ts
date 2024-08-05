import { stegaClean } from '@sanity/client/stega'

export default function ({ uid = undefined, _key }: Partial<Sanity.Module>) {
	return stegaClean(uid) || _key
}
