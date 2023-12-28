import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
    build: {
        lib: {
            name: "my-list",
            fileName: () => "bundle.js",
            entry: "src/index.ts",
            formats: ["umd"],
        }
    }
}));