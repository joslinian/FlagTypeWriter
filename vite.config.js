import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@assets": path.resolve(__dirname, "./client/public"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: ["j3xkn4-5000.csb.app"],
  },
});
