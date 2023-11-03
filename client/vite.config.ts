import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/vote": "http://localhost:5000",
      "/data": "http://localhost:5000",
      "/counts": "http://localhost:5000",
      "/results": "http://localhost:5000",
    },
  },
  plugins: [react()],
});
