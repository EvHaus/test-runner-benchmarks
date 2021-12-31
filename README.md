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

- `jasmine`: This is our baseline, using Jasmine and JSDom.
- `jest`: Exact same test suite, but running using Jest.
- `jest-dot`: [It was suggested](https://github.com/facebook/jest/issues/6694#issuecomment-409574937) that using Jest's dot reporter might result in faster performance. This suite is identical to `jest` but uses the dot reporter to test that hypothesis.
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

- `jasmine` (11.421s mean)
```
Benchmark 1: yarn workspace jasmine test
  Time (mean ± σ):     17.135 s ±  0.494 s    [User: 18.965 s, System: 1.298 s]
  Range (min … max):   16.379 s … 17.723 s    10 runs
 
Benchmark 2: yarn workspace jest test
  Time (mean ± σ):     29.901 s ±  0.454 s    [User: 81.712 s, System: 14.807 s]
  Range (min … max):   29.407 s … 30.714 s    10 runs
 
Benchmark 3: yarn workspace jest-dot test
  Time (mean ± σ):     29.617 s ±  0.425 s    [User: 81.437 s, System: 14.679 s]
  Range (min … max):   29.011 s … 30.228 s    10 runs
 
Benchmark 4: yarn workspace vitest test
  Time (mean ± σ):     14.815 s ±  0.068 s    [User: 16.592 s, System: 1.780 s]
  Range (min … max):   14.724 s … 14.930 s    10 runs
 
Summary
  'yarn workspace vitest test' ran
    1.16 ± 0.03 times faster than 'yarn workspace jasmine test'
    2.00 ± 0.03 times faster than 'yarn workspace jest-dot test'
    2.02 ± 0.03 times faster than 'yarn workspace jest test'
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
