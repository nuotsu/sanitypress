import { groq } from 'next-sanity'

// @sanity-typegen-ignore
export const FORM_MODULE_QUERY = groq`
	_type == 'form-module' => {
		form->
	}
`
