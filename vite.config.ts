import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	publicDir: "static",
	build: {
		outDir: "public"
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: "modern"
			}
		}
	},
	resolve: {
		alias: {
			"@": "/src"
		}
	}
})
