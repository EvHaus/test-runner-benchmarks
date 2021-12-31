const {execSync} = require('child_process');
const path = require('path');

const ROOT_DIR = process.cwd();

const types = ['jasmine', 'jest', 'jest-dot', 'vitest'];

types.forEach((type) => {
    const TYPE_DIR = path.resolve(ROOT_DIR, type, 'tests');

    execSync(`rm -rf ${TYPE_DIR}`)
    
    Array.from(new Array(10)).forEach((_, i) => {
        const targetDir = path.join(TYPE_DIR, `replica${i + 1}`);
        execSync(`mkdir -p ${targetDir}`)
        execSync(`cp -r tests/* ${targetDir}`)
    });
});