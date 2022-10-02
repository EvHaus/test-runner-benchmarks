import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        environment: 'happy-dom',
        isolate: false,
        setupFiles: ['setupFile.ts'],
        watch: false
    },
})