import { defineConfig } from 'sanity'
import { BASE_URL, projectId } from './src/env'
import { structureTool } from 'sanity/structure'
import structure from './src/structure'
import { locations } from './src/presentation'
import { presentationTool } from 'sanity/presentation'
import {
	dashboardTool,
	projectInfoWidget,
	projectUsersWidget,
} from '@sanity/dashboard'
import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './schemas'

const singletonTypes = ['site']

export default defineConfig({
	name: 'default',
	title: 'SanityPress',

	projectId,
	dataset: 'production',
	basePath: '/admin',

	plugins: [
		structureTool({
			title: 'Content',
			structure,
		}),
		presentationTool({
			title: 'Editor',
			previewUrl: {
				draftMode: {
					enable: `${BASE_URL}/api/draft`,
				},
			},
			resolve: { locations },
		}),
		dashboardTool({
			title: 'Deployment',
			widgets: [projectInfoWidget(), projectUsersWidget(), vercelWidget()],
		}),
		visionTool({ title: 'GROQ' }),
		codeInput(),
	],

	scheduledPublishing: {
		enabled: false,
	},

	schema: {
		types: schemaTypes,
		templates: (templates) =>
			templates.filter(
				({ schemaType }) => !singletonTypes.includes(schemaType),
			),
	},

	document: {
		actions: (input, { schemaType }) =>
			singletonTypes.includes(schemaType)
				? input.filter(
						({ action }) =>
							action &&
							['publish', 'discardChanges', 'restore'].includes(action),
					)
				: input,
	},
})
