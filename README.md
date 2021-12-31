# jest-vs-jasmine

This repo is setup to test the performance of various test runners. Specially to:

- Help the Jest team with https://github.com/facebook/jest/issues/6694.
- Help the Vitest team with https://github.com/vitest-dev/vitest/issues/229

## Setup

1. Install `hyperfine` via [these instructions](https://github.com/sharkdp/hyperfine#installation):
2. Install dependencies:
```sh
yarn
```

Then you can run benchmarks via:

```sh
hyperfine --warmup 1 'yarn workspace jasmine test' 'yarn workspace jest test' 'yarn workspace jest-dot test' 'yarn workspace vitest test'
```

## Suites

- `jasmine`: This is our baseline, using Jasmine and JSDom
- `jest`: Exact same test suite, but running using Jest
- `jest-dot`: [It was suggested](https://github.com/facebook/jest/issues/6694#issuecomment-409574937) that using Jest's dot reporter might result in faster performance. This suite is identical to `jest` but uses the dot reporter to test that hypothesis.
- `vitest`: Exact same test suite, but running using Vitest and JSDom

## Results

> `npx envinfo --preset jest` is used to grab the current environment settings

#### 2019 MacBook Pro

```
System:
  OS: macOS 12.1
  CPU: (8) x64 Intel(R) Core(TM) i5-8279U CPU @ 2.40GHz
Binaries:
  Node: 16.13.1 - ~/.nvm/versions/node/v16.13.1/bin/node
  Yarn: 3.1.1 - /usr/local/bin/yarn
  npm: 8.1.2 - ~/.nvm/versions/node/v16.13.1/bin/npm
```

- `jasmine` (11.421s mean)
```
Benchmark 1: yarn workspace jasmine test
  Time (mean ± σ):     10.243 s ±  0.146 s    [User: 12.076 s, System: 0.922 s]
  Range (min … max):   10.062 s … 10.488 s    10 runs
 
Benchmark 2: yarn workspace jest test
  Time (mean ± σ):     17.702 s ±  0.466 s    [User: 46.418 s, System: 8.754 s]
  Range (min … max):   17.155 s … 18.758 s    10 runs
 
Benchmark 3: yarn workspace jest-dot test
  Time (mean ± σ):     17.613 s ±  0.264 s    [User: 46.296 s, System: 8.722 s]
  Range (min … max):   17.306 s … 18.175 s    10 runs
 
Benchmark 4: yarn workspace vitest test
  Time (mean ± σ):     41.493 s ±  0.257 s    [User: 113.290 s, System: 24.967 s]
  Range (min … max):   41.061 s … 41.959 s    10 runs
 
Summary
  'yarn workspace jasmine test' ran
    1.72 ± 0.04 times faster than 'yarn workspace jest-dot test'
    1.73 ± 0.05 times faster than 'yarn workspace jest test'
    4.05 ± 0.06 times faster than 'yarn workspace vitest test'
```

#### Conclusion

As you can see Jest is significantly slower running the exact same tests. In this case, with 710 or so specs, it's about 2 times slower even on the most modern 2019 MacBook Pro. When this is extrapolated to the size of a large project (such as the one I'm working on at my company) and/or run on older devices -- Jest ends up consuming 5 to 7 times more time and resources for our 7000+ spec test suite. So the problem gets worse with more specs, not better.

As much as we love Jest's superior developer experience, such a serious performance difference makes it very difficult for us to continue using Jest as our primary test runner. My hope is that this isolated test bed project can be used to troubleshoot and diagnose the specific reasons for the performance difference so that Jest could be optimized to run faster.

## Tests

The repository has 105 test suites in `/tests`. These will be identical files that will be processed by both all test runners. These tests are intentionally duplicated through several replicas to increase the total number of specs to create a more consistent average run time and to simulate a larger project.

## Philosophy

- Use `hyperfine` for consistent and reproducible benchmark collection
- Discard the first run (via `--warmup 1`) to let various caches build up
- Use minimal configurations (ie. stock configurations)
- Tests should represent real-world scenarios (in this case, they are copies of real files used in real projects)
- Use a mixture of fast, simple tests and slow complex enzyme mounted full render tests to simulate real world scenarios
