import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// 代码检查
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin({ include: ["src/*.jsx", "src/**/*.jsx"] })],
  css: {
    modules: {
      localsConvention: 'camelCase', // 将类名转化成驼峰式
    }
  }
});
