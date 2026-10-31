import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base "./" lets the build work on GitHub Pages (any repo name) and Vercel.
export default defineConfig({ base: "./", plugins: [react(), tailwindcss()] });
