import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@views": path.resolve(__dirname, "src/views"),
      "@router": path.resolve(__dirname, "src/router"),
    },
  },
});
