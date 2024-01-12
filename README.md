# test-runner-benchmarks

This repo is setup to test the performance of various test runners. Specially to:

- Help the **Jest** team with https://github.com/facebook/jest/issues/6694.
- Help the **Vitest** team with https://github.com/vitest-dev/vitest/issues/229 & https://github.com/vitest-dev/vitest/issues/579

![](results.png?raw=true)

## Setup

1. Install `hyperfine` via [these instructions](https://github.com/sharkdp/hyperfine#installation):
2. Install dependencies:
```sh
yarn
```

Then you can run benchmarks via:

```sh
hyperfine --warmup 1 \
    'yarn workspace jasmine test' \
    'yarn workspace jest test' \
    'yarn workspace vitest test' \
    'yarn workspace vitest test --pool=vmThreads' \
    'yarn workspace vitest test --poolOptions.threads.isolate=false' \
    'yarn workspace bun test'
```

> [!NOTE]
> These benchmarks are supported on MacOS and Linux. Windows is **not** supported at this time.

## Suites

- `jasmine`: This is our baseline, using Jasmine and happy-dom.
- `jest`: Same test suite, but running using Jest.
- `vitest`: Same test suite, but running using Vitest. NOTE: That benchmarks include vitest with the `--poolOptions.threads.isolate` setting both enabled and disabled due to [this issue](https://github.com/vitest-dev/vitest/issues/229#issuecomment-1003235680)
- `bun`: Same test suite, but running using Bun.

## Results

Benchmarks are run via GitHub Actions. You can check the latest run results [here](https://github.com/EvHaus/jest-vs-jasmine/actions/workflows/benchmark.yaml).

## Philosophy

- Use `hyperfine` for consistent and reproducible benchmark collection
- Discard the first run (via `--warmup 1`) to let various caches build up
- Use minimal configurations (ie. stock configurations)
- Tests should represent real-world scenarios (in this case, they are copies of real files used in real projects)
- Tests should be updated for each test runner's best practices and APIs to give them the best chance possible to be optimized (eg. Jasmine uses APIs like `createSpy()` whereas Jest has `jest.fn()` and Vitest has `vi.fn()`)

## Other Suites

- `jest-dot`: [It was suggested](https://github.com/facebook/jest/issues/6694#issuecomment-409574937) that using Jest's dot reporter might result in faster performance. In the past this benchmark repo had a `jest-dot` suite to validate this but after many runs, it had nearly no impact on performance. The suite has since been removed.
- `jest-goloveychuk`: [GitHub user @goloveychuk suggested a solution](https://github.com/facebook/jest/issues/6694#issuecomment-814234244) which reduces Jest's memory usage. This solution was added and tested, but the performance impact was not any different.
- `fastest-jest-runner`: Same as `jest` but using [`fastest-jest-runner`](https://github.com/goloveychuk/fastest-jest-runner). This solution was tested for several months but its performance in this benchmark was far worse than any of the others (including the baseline `jest`). It was removed in 2023-02-25.
- `jest-swc`: Same as `jest` but using `@swc/jest` instead of `ts-jest`. It showed virtually no impact on performance. It was removed in 2023-05-22.

