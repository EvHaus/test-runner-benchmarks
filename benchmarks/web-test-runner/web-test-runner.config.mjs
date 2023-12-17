import { esbuildPlugin } from '@web/dev-server-esbuild';
import { puppeteerLauncher } from '@web/test-runner-puppeteer';

export default {
    browsers: [puppeteerLauncher()],
    files: [
        // 'tests/**/*.test.*'
        'tests/original/Alert/*.test.*'
    ],
    nodeResolve: true,
    plugins: [
        esbuildPlugin({
            tsx: true
        })
    ],
    rootDir: '../../',
};