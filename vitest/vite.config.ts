import { defineConfig } from 'vite'
import { esbuildFlowPlugin, flowPlugin } from '@bunchtogether/vite-plugin-flow';
import react from '@vitejs/plugin-react';

export default defineConfig({
    optimizeDeps: {
        esbuildOptions: {
            plugins: [esbuildFlowPlugin()]
        }
    },
    plugins: [flowPlugin(), react()],
    test: {
        environment: 'jsdom',
        global: true,
        setupFiles: ['setupTestFrameworkScriptFile.js'],
        watch: false
    },
})