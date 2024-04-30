import { defineCliConfig } from 'sanity/cli'
import { projectId } from './src/env'

export default defineCliConfig({
	api: {
		projectId,
		dataset: 'production',
	},
})
