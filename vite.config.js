import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	root: ".",
	publicDir: false, // We'll handle static files manually
	build: {
		outDir: "dist",
		rollupOptions: {
			input: {
				main: resolve("./index.html"),
				worker: resolve("./js/worker.js"),
			},
			output: {
				entryFileNames: (chunkInfo) => {
					return chunkInfo.name === "worker"
						? "worker.js"
						: "assets/[name]-[hash].js";
				},
			},
		},
	},
	server: {
		port: 8000,
		open: true,
		proxy: {
			"/worker.js": {
				target: "http://localhost:8000",
				changeOrigin: true,
				rewrite: () => "/js/worker.js",
			},
		},
	},
});
