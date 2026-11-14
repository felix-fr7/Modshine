import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import seoPlugin from './vite-plugin-seo.js';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    plugins: [
      react(),
      seoPlugin({
        siteUrl: env.VITE_SITE_URL || 'https://modshineinterior.in',
        apiUrl: env.VITE_API_URL,
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          // keep animation + admin code out of the first download
          manualChunks: {
            react: ['react', 'react-dom'],
            motion: ['gsap', 'lenis'],
          },
        },
      },
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
          secure: false
        }
      }
    }
  };
});
