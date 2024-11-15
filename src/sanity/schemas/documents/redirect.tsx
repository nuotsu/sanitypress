import { defineField, defineType } from 'sanity'
import { PiFlowArrow } from 'react-icons/pi'

const regex = /^(\/|https?:\/\/)/

export default defineType({
	name: 'redirect',
	title: 'Redirect',
	icon: PiFlowArrow,
	type: 'document',
	fields: [
		defineField({
			name: 'source',
			title: 'Redirect from',
			placeholder: 'e.g. /old-path, /old-blog/:slug',
			type: 'string',
			validation: (Rule) => Rule.required().regex(regex),
		}),
		defineField({
			name: 'destination',
			title: 'Redirect to',
			placeholder: 'e.g. /new-path, /blog/:slug',
			type: 'string',
			validation: (Rule) => Rule.required().regex(regex),
		}),
		defineField({
			name: 'permanent',
			type: 'boolean',
			initialValue: true,
			description: (
				<>
					<p>
						If <code>true</code> will use the 308 status code which instructs
						clients/search engines to cache the redirect forever, if{' '}
						<code>false</code> will use the 307 status code which is temporary
						and is not cached.
					</p>
					<p>
						<a
							href="https://nextjs.org/docs/app/api-reference/next-config-js/redirects"
							target="_blank"
						>
							Next.js redirects documentation
						</a>
					</p>
				</>
			),
		}),
	],
	preview: {
		select: {
			title: 'source',
			destination: 'destination',
		},
		prepare: ({ title, destination }) => ({
			title,
			subtitle: `to ${destination}`,
		}),
	},
})
