import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

import structure from './src/structure'

export default defineConfig({
	name: 'default',
	title: 'Next.js + Sanity Template',

	projectId: 'elyfelq1',
	dataset: 'production',

	plugins: [deskTool({ structure }), visionTool()],

	schema: {
		types: schemaTypes,
	},
})
