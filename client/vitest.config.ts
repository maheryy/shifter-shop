import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "tests/setup.ts",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@data": path.resolve(__dirname, "data"),
      "@icons": path.resolve(__dirname, "src/assets/icons"),
    },
  },
});
