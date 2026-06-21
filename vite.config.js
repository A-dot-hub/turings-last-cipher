import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    base: "./", // IMPORTANT FOR ITCH.IO

    plugins: [tailwindcss()],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
      extensions: [".js", ".css", ".json"],
    },

    server: {
      hmr: process.env.DISABLE_HMR !== "true",
      watch: process.env.DISABLE_HMR === "true" ? null : {},
    },
  };
});
