import legacy from '@vitejs/plugin-legacy';
import { defineConfig, mergeConfig } from 'vite';

import commonConfig from './vite.common';
import packageJson from '../../package.json';

const devConfig = defineConfig({
    mode: 'development',
    build: { sourcemap: true },
    server: {
        port: 3000,
        strictPort: true,
        hmr: true,
        open: false,
        cors: false,
        proxy: {
            '/api/portfolio': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                secure: false
                // rewrite: (path) => path.replace(/^\/api/, ''), // Optional: adjust path if necessary
            }
        }
    },
    define: {
        'process.env': {
            APP_VERSION: packageJson.version,
            APP_ENV: 'development'
        }
    },
    plugins: [legacy({ targets: 'last 2 chrome versions, last 2 firefox versions, last 2 safari versions, last 2 edge versions' })]
});

export default mergeConfig(commonConfig, devConfig);