import path from 'path';
import process from 'process';

import legacy from '@vitejs/plugin-legacy';
import { defineConfig, mergeConfig } from 'vite';

import commonConfig from './vite.common';
import packageJson from '../../package.json';

const rootDirectory = process.cwd();
const buildDirectory = path.resolve(rootDirectory, 'build', 'ui');

const prodConfig = defineConfig({
    mode: 'production',
    build: {
        emptyOutDir: true,
        sourcemap: true,
        outDir: buildDirectory,
        rollupOptions: {
            output: {
                entryFileNames: '[name].[hash].bundle.js',
                chunkFileNames: '[name].[hash].bundle.js',
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        }
    },
    define: {
        'process.env': {
            APP_VERSION: packageJson.version,
            APP_ENV: 'production'
        }
    },
    plugins: [legacy({ targets: '> 0.3% and not dead and last 20 versions' })]
});

export default mergeConfig(commonConfig, prodConfig);