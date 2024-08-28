/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    devSourcemap: true,
  },
  test: {
    environment: "jsdom",
    deps: {
      interopDefault: true,
    },
    coverage: {
      provider: "v8",
      include: ["src"],
    },
    globals: true,
    setupFiles: "./src/tests/setup.ts",
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@styles": path.resolve(__dirname, "./src/assets/styles/"),
    },
  },
});
