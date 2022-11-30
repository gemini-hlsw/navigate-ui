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
  server: {
    host: "0.0.0.0",
    proxy: {
      // '/api/seqexec/events': {
      //   target: "http://localhost:7070",
      //   changeOrigin: true,
      //   ws: true
      // },
      '/ping': {
        target: "http://localhost:7070"
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
  ]
})
