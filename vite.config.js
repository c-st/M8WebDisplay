import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	root: ".",
	publicDir: false, // We'll handle static files manually
	build: {
		outDir: "dist",
		rollupOptions: {
			input: resolve("./index.html"),
		},
	},
	server: {
		port: 8000,
		open: true,
	},
});
