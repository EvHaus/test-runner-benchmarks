const {execSync} = require('child_process');
const path = require('path');
const { readdir } = require('fs/promises');

const ROOT_DIR = process.cwd();
const BENCHMARKS_DIR = path.join(ROOT_DIR, 'benchmarks');

const getBenchmarks = async source =>
  (await readdir(source, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const main = async () => {
    const benchmarks = await getBenchmarks(BENCHMARKS_DIR);
    benchmarks.forEach((benchmark) => {
        const BENCHMARK_DIR = path.join(BENCHMARKS_DIR, benchmark, 'tests');
        Array.from(new Array(10)).forEach((_, i) => {
            const REPLICA_DIR = path.join(BENCHMARK_DIR, `replica${i + 1}`);
            execSync(`rm -rf ${REPLICA_DIR}`)
            execSync(`cp -r ${path.join(BENCHMARK_DIR, 'original')} ${REPLICA_DIR}`)
        });
    });
}

main();