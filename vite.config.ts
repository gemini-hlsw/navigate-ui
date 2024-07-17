/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import mkcert from 'vite-plugin-mkcert';

function fixCssRoot() {
  return {
    postcssPlugin: 'postcss-fix-nested-root',
    Once(root: any) {
      root.walkRules((rule: any) => {
        if (rule.selector.includes(' :root')) {
          rule.selector = rule.selector.replace(' :root', '');
        }
      });
    },
  };
}
fixCssRoot.postcss = true;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    'globalThis.__DEV__': JSON.stringify(mode !== 'production'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Contexts': path.resolve(__dirname, './src/components/Contexts'),
      '@Telescope': path.resolve(__dirname, './src/components/Panels/Telescope'),
      '@WavefrontSensors': path.resolve(__dirname, './src/components/Panels/WavefrontSensors'),
      '@Guider': path.resolve(__dirname, './src/components/Panels/Guider'),
      '@Shared': path.resolve(__dirname, './src/components/Shared'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@gql': path.resolve(__dirname, './src/gql'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('primereact')) return 'prime';
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '^/navigate/graphql': {
        target: 'http://navigate.lucuma.xyz:9070',
        changeOrigin: true,
      },
      '^/db': {
        target: 'http://navigate.lucuma.xyz:4000',
        changeOrigin: true,
      },
      '^/odb': {
        target: 'https://lucuma-postgres-odb-dev.herokuapp.com',
        changeOrigin: true,
      },
      '^/navigate/ws': {
        target: 'ws://localhost:9070',
        changeOrigin: true,
        ws: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
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
  plugins: [
    react({
      plugins: [
        // https://jotai.org/docs/tools/swc
        ['@swc-jotai/react-refresh', {}],
        ['@swc-jotai/debug-label', {}],
      ],
    }),
    mkcert({ hosts: ['localhost', 'local.lucuma.xyz', 'navigate.lucuma.xyz'] }),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  base: '/',
}));
