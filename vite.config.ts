/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import basicSsl from "@vitejs/plugin-basic-ssl"
import path from "path"

function fixCssRoot() {
  return {
    postcssPlugin: "postcss-fix-nested-root",
    Once(root: any) {
      root.walkRules((rule: any) => {
        if (rule.selector.includes(" :root")) {
          rule.selector = rule.selector.replace(" :root", "")
        }
      })
    },
  }
}
fixCssRoot.postcss = true

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@Contexts": path.resolve(__dirname, "./src/components/Contexts"),
      "@Telescope": path.resolve(
        __dirname,
        "./src/components/Panels/Telescope"
      ),
      "@WavefrontSensors": path.resolve(
        __dirname,
        "./src/components/Panels/WavefrontSensors"
      ),
      "@Guider": path.resolve(__dirname, "./src/components/Panels/Guider"),
      "@Shared": path.resolve(__dirname, "./src/components/Shared"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@gql": path.resolve(__dirname, "./src/gql"),
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "^/navigate/graphql": {
        target: "http://localhost:7070",
        changeOrigin: true,
      },
      // "ws://localhost/navigate/ws": {
      //   target: "ws://localhost:7070",
      //   changeOrigin: true,
      //   ws: true,
      // },
    },
  },
  preview: {
    host: "0.0.0.0",
    proxy: {
      "^/navigate/graphql": {
        target: "http://localhost:7070",
        changeOrigin: true,
      },
      // "ws://localhost/navigate/ws": {
      //   target: "ws://localhost:7070",
      //   changeOrigin: true,
      //   ws: true,
      // },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
    postcss: {
      plugins: [fixCssRoot()],
    },
  },
  plugins: [react(), basicSsl()],
  test: {
    environment: "jsdom",
  },
  base: "/",
})
