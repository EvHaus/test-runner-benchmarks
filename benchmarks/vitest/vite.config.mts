import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        css: {
            modules: {
                classNameStrategy: 'non-scoped'
            }
        },
        environment: 'happy-dom',
        pool: 'threads',
        setupFiles: ['setupFile.ts'],
        watch: false
    },
})
