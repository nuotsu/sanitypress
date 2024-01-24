import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/{app,ui}/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {},
			fontFamily: {},
		},
	},
	plugins: [],
}
export default config
