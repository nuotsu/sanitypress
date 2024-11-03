import { defineCliConfig } from 'sanity/cli'
import { projectId, dataset } from './src/env'

export default defineCliConfig({
	api: {
		projectId,
		dataset,
	},
})
