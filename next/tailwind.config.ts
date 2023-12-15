import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/{app,components}/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {},
	},
	plugins: [],
	safelist: ['action'],
}
export default config
