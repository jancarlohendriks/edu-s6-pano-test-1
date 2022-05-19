import { defineConfig } from 'vite'
import { resolve } from 'pathe'

export default defineConfig({
	base: '/pano-test-1/',
	root: 'src',
	build: {
		outDir: '../dist'
	},
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  }
})