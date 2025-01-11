import { stegaClean } from 'next-sanity'

export default function ({ _type, options, _key }: Partial<Sanity.Module>) {
	return {
		id: stegaClean(options?.uid) || 'module-' + _key,
		'data-module': _type,
		hidden: options?.hidden,
	}
}
