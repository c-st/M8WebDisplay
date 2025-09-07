import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// Ensure build directory exists
const buildDir = path.join(projectRoot, "build");
if (!fs.existsSync(buildDir)) {
	fs.mkdirSync(buildDir, { recursive: true });
}

console.log("Building assets...");

// Build shaders.js
function buildShaders() {
	console.log("Building shaders.js");
	const shadersDir = path.join(projectRoot, "resources/shaders");
	const shaderFiles = fs
		.readdirSync(shadersDir)
		.filter((f) => f.endsWith(".vert") || f.endsWith(".frag"));

	let shaderCode = "";
	for (const file of shaderFiles) {
		const content = fs.readFileSync(path.join(shadersDir, file), "utf8");
		const varName = file.replace(".", "_");
		const minified = content
			.replace(/\/\/.*$/gm, "") // Remove comments
			.replace(/\s+/g, " ") // Collapse whitespace
			.trim();

		shaderCode += `export const ${varName} = \`${minified}\`;\n`;
	}

	fs.writeFileSync(path.join(buildDir, "shaders.js"), shaderCode);
}

// Build font assets
function buildFontAssets() {
	console.log("Building font assets");

	// Font1 JS
	const font1Data = fs.readFileSync(
		path.join(projectRoot, "resources/images/font1.png"),
		"base64",
	);
	fs.writeFileSync(
		path.join(buildDir, "font1.js"),
		`export const font1 = 'data:image/png;base64,${font1Data}';`,
	);

	// Font2 JS
	const font2Data = fs.readFileSync(
		path.join(projectRoot, "resources/images/font2.png"),
		"base64",
	);
	fs.writeFileSync(
		path.join(buildDir, "font2.js"),
		`export const font2 = 'data:image/png;base64,${font2Data}';`,
	);

	// Font1 SCSS
	const font1WoffData = fs.readFileSync(
		path.join(projectRoot, "resources/fonts/m8stealth57.woff2"),
		"base64",
	);
	fs.writeFileSync(
		path.join(buildDir, "font1.scss"),
		`@font-face {
    font-family: 'm8stealth57';
    src: url('data:font/woff2;base64,${font1WoffData}') format('woff2');
}`,
	);

	// Font2 SCSS
	const font2WoffData = fs.readFileSync(
		path.join(projectRoot, "resources/fonts/m8stealth89.woff2"),
		"base64",
	);
	fs.writeFileSync(
		path.join(buildDir, "font2.scss"),
		`@font-face {
    font-family: 'm8stealth89';
    src: url('data:font/woff2;base64,${font2WoffData}') format('woff2');
}`,
	);
}

try {
	buildShaders();
	buildFontAssets();
	console.log("Assets built successfully!");
} catch (error) {
	console.error("Error building assets:", error);
	process.exit(1);
}
