import { readdir } from "node:fs/promises";
import { $ } from "bun";

const BENCHMARKS_DIR = `${import.meta.dir}/benchmarks`;

const benchmarks = (await readdir(BENCHMARKS_DIR, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

for (const benchmark of benchmarks) {
    const cwd = `${BENCHMARKS_DIR}/${benchmark}`;
    if (process.env.CI) {
        await $`bun install --frozen-lockfile --cwd ${cwd}`;
    } else {
        await $`bun install --cwd ${cwd}`;
    }

    const testsDir = `${cwd}/tests`;
    for (let i = 1; i <= 10; i++) {
        const replicaDir = `${testsDir}/replica${i}`;
        await $`rm -rf ${replicaDir}`;
        await $`cp -r ${testsDir}/original ${replicaDir}`;
    }
}
