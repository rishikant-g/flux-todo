import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  envDir: "environments",
  build: {
    outDir: `dist/${mode}`,
    sourcemap: false,
  },
}));
