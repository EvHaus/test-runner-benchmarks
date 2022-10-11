import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        css: {
            modules: {
                classNameStrategy: 'non-scoped'
            }
        },
        environment: 'happy-dom',
        isolate: false,
        setupFiles: ['setupFile.ts'],
        watch: false
    },
})