import { stegaClean } from 'next-sanity'
import type { Form } from '@/sanity/types'
import Contact from './contact'

export default function ({ form }: { form?: Form }) {
	if (!form) return null

	switch (stegaClean(form.identifier)) {
		case 'contact':
			return <Contact form={form} />

		default:
			return null
	}
}
