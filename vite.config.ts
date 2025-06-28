import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@shared": path.resolve(__dirname, "./src/components/shared"),
    },
  },
});
