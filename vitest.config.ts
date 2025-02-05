import { defineConfig } from "vitest/config";
import process from "process";
import path from 'path';

const rootDirectory = process.cwd();

const config = defineConfig({
    test: {
        clearMocks: true,
        root: rootDirectory,
        include: [
            'src/**/*.test.+(ts|tsx)',
            'server.src/**/*.test.+(ts)'
        ],
        setupFiles: [path.resolve(rootDirectory, 'vitest.setup.ts')],
        globals: true,
        environment: 'jsdom',
        coverage: {
            reportsDirectory: path.resolve(rootDirectory, 'coverage'),
            reporter: ['html', 'lcov']
        },
        passWithNoTests: true
    }
});

export default config;