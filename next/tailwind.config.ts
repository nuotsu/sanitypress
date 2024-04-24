import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/{app,ui}/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {},
			fontFamily: {},
		},
	},
	safelist: ['action'],
}
export default config
