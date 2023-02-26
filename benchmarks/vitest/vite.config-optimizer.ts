import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        css: {
            modules: {
                classNameStrategy: 'non-scoped'
            }
        },
        deps: {
            experimentalOptimizer: {
                enabled: true
            }
        },
        environment: 'happy-dom',
        setupFiles: ['setupFile.ts'],
        watch: false
    },
})