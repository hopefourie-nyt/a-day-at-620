import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [],
	server: { host: '0.0.0.0', port: Number(process.env.PORT) || 3000 },
	clearScreen: false,
	base: '/a-day-at-620/',
})
