import path from 'path';
import process from 'process';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const rootDirectory = process.cwd();
const srcDirectory = path.resolve(rootDirectory, 'src');

const commonConfig = defineConfig({
    root: srcDirectory,
    appType: 'spa',
    resolve: {
        extensions: [ '.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json', '.css' ],
        alias: {
            '@': path.resolve(rootDirectory, 'src'),
            '@layout': path.resolve(rootDirectory, 'src', 'layout'),
            '@pages': path.resolve(rootDirectory, 'src', 'pages'),
            '@components': path.resolve(rootDirectory, 'src', 'components'),
            '@assets': path.resolve(rootDirectory, 'src', 'assets'),
            '@api': path.resolve(rootDirectory, 'src', 'api')
        }
    },
    css: {
        modules: {
            localsConvention: 'camelCaseOnly',
            generateScopedName: '[name]__[local]'
        }
    },
    plugins: [react()]
});

export default commonConfig;