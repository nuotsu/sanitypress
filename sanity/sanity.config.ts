import { defineConfig } from 'sanity'
import { projectId } from './src/env'
import { structureTool } from 'sanity/structure'
import defaultDocumentNode from './src/defaultDocumentNode'
import structure from './src/structure'
import {
	dashboardTool,
	projectInfoWidget,
	projectUsersWidget,
} from '@sanity/dashboard'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const singletonTypes = ['site']

export default defineConfig({
	name: 'default',
	title: 'Next.js + Sanity.io Starter Template',

	projectId,
	dataset: 'production',

	plugins: [
		structureTool({ defaultDocumentNode, structure }),
		dashboardTool({ widgets: [projectInfoWidget(), projectUsersWidget()] }),
		visionTool(),
	],

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
