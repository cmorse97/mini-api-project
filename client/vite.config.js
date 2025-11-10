import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('proxy error: ', err);
          }),
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log(
                `Sending ${req.method} request to the target: `,
                req.url,
              );
            });
        },
      },
    },
  },
});
