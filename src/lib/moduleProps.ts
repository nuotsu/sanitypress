import { stegaClean } from 'next-sanity'

export default function ({ _type, uid, _key }: Partial<Sanity.Module>) {
	return {
		id: stegaClean(uid) || 'module-' + _key,
		'data-module': _type,
	}
}
