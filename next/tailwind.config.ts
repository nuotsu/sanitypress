import plugin from 'tailwindcss/plugin'
import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/{app,ui}/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				ink: '#000',
				canvas: '#fff',
			},
			fontFamily: {},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('header-closed', 'body:has(#header-open:not(:checked)) &')
		}),
	],
	safelist: ['action'],
}
export default config
