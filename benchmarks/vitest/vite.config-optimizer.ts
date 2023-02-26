import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        css: {
            modules: {
                classNameStrategy: 'non-scoped'
            }
        },
        deps: {
            experimentalOptimizer: true
        },
        environment: 'happy-dom',
        setupFiles: ['setupFile.ts'],
        watch: false
    },
})