import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./src/{app,components}/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			screens: {
				'<sm': { max: '639px' },
				'<md': { max: '767px' },
				'<lg': { max: '1023px' },
				'<xl': { max: '1279px' },
			},
		},
	},
	plugins: [],
}
export default config
