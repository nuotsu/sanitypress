import { defineField, defineType } from 'sanity'
import { PiFlowArrow } from 'react-icons/pi'

export default defineType({
	name: 'redirect',
	title: 'Redirect',
	icon: PiFlowArrow,
	type: 'document',
	fields: [
		defineField({
			name: 'source',
			type: 'string',
			placeholder: '/, /blog/:path*, etc',
		}),
		defineField({
			name: 'destination',
			type: 'string',
			placeholder: '/, /blog/:path*, etc',
			description: (
				<a
					href="https://nextjs.org/docs/app/api-reference/next-config-js/redirects"
					target="_blank"
				>
					Next.js Documentation
				</a>
			),
		}),
		defineField({
			name: 'permanent',
			type: 'boolean',
			initialValue: true,
			description:
				'If true will use the 308 status code which instructs clients/search engines to cache the redirect forever, if false will use the 307 status code which is temporary and is not cached.',
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
