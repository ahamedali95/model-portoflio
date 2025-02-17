import path from 'path';
import process from 'process';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const rootDirectory = process.cwd();
const srcDirectory = path.resolve(rootDirectory, 'src');

const commonConfig = defineConfig({
    root: srcDirectory,
    appType: 'spa',
    resolve: { extensions: [ '.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.css' ]},
    css: {
        modules: {
            localsConvention: 'camelCaseOnly',
            generateScopedName: '[name]__[local]'
        }
    },
    plugins: [
        react(),
        tsconfigPaths(),
        tailwindcss()
    ]
});

export default commonConfig;