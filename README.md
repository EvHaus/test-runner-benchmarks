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
hyperfine --warmup 1 'yarn workspace jasmine test' 'yarn workspace jest test' 'yarn workspace vitest test'
```

## Suites

- `jasmine`: This is our baseline, using Jasmine and JSDom.
- `jest`: Exact same test suite, but running using Jest.
- `vitest`: Exact same test suite, but running using Vitest and JSDom. (Note that Vitest is running with `threads` setting set to `false`).

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

```
Benchmark 1: yarn workspace jasmine test
  Time (mean ± σ):     17.051 s ±  0.673 s    [User: 19.183 s, System: 1.313 s]
  Range (min … max):   16.377 s … 18.236 s    10 runs
 
Benchmark 2: yarn workspace jest test
  Time (mean ± σ):     30.310 s ±  0.511 s    [User: 82.259 s, System: 14.939 s]
  Range (min … max):   29.550 s … 31.298 s    10 runs
 
Benchmark 4: yarn workspace vitest test
  Time (mean ± σ):     14.845 s ±  0.154 s    [User: 16.649 s, System: 1.796 s]
  Range (min … max):   14.706 s … 15.112 s    10 runs
 
Summary
  'yarn workspace vitest test' ran
    1.15 ± 0.05 times faster than 'yarn workspace jasmine test'
    2.04 ± 0.04 times faster than 'yarn workspace jest test'
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

## Other Suites

- `jest-dot`: [It was suggested](https://github.com/facebook/jest/issues/6694#issuecomment-409574937) that using Jest's dot reporter might result in faster performance. In the past this benchmark repo had a `jest-dot` suite to validate this but after many runs, it had nearly no impact on performance. The suite has since been removed.
- `jest-goloveychuk`: [GitHub user @goloveychuk suggested a solution](https://github.com/facebook/jest/issues/6694#issuecomment-814234244) which reduces Jest's memory usage. This solution was added and tested, but the performance impact was not any different.

