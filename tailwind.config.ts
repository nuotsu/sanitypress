import plugin from 'tailwindcss/plugin'
import type { Config } from 'tailwindcss'

export default {
	content: ['./src/{app,ui}/**/*.{ts,tsx}'],
	theme: {
		extend: {
			colors: {
				ink: '#1d1d1f',
				canvas: '#fff',

				accent: '#1d1d1f',
			},
			maxHeight: {
				fold: 'calc(100svh - var(--header-height))',
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('header-open', 'body:has(#header-open:checked) &')
			addVariant('header-closed', 'body:has(#header-open:not(:checked)) &')
		}),
	],
	safelist: [{ pattern: /action.*/ }, 'ghost'],
} satisfies Config
