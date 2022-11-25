import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
    // https: true,
    // proxy: {
    //   '/api': 'http://localhost:5173'
    // }
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
    postcss: {
      plugins: [fixCssRoot]
    },
  },
  plugins: [react()]
})
