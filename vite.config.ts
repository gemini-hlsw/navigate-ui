/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

function fixCssRoot() {
  return {
    postcssPlugin: 'postcss-fix-nested-root',
    Once(root: any) {
      root.walkRules((rule: any) => {
        if (rule.selector.includes(' :root')) {
          rule.selector = rule.selector.replace(' :root', '');
        }
      });
    }
  }
}
fixCssRoot.postcss = true;

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      '/ping': {
        target: "http://localhost:7070"
      },
      '^/graphqlapi/.*': {
        target: "http://localhost:7070",
        changeOrigin: true
      },
      '^/api/.*': {
        target: "http://localhost:7070",
        changeOrigin: true
      }
    }
  },
  preview: {
    host: "0.0.0.0",
    proxy: {
      '/ping': {
        target: "http://localhost:7070"
      },
      '^/graphqlapi/.*': {
        target: "http://localhost:7070",
        changeOrigin: true
      },
      '^/api/.*': {
        target: "http://localhost:7070",
        changeOrigin: true
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
    postcss: {
      plugins: [
        fixCssRoot()
      ]
    },
  },
  plugins: [
    react(),
    basicSsl()
  ],
  test: {
    environment: "jsdom"
  },
  base: '/'
})
