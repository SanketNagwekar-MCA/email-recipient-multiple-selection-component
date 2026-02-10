import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuration for demo/development (Vercel deployment)
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist-demo",
  },
});
