# jest-vs-jasmine

This repo is setup to test the performance of running tests via the Jest runner vs running the same tests via Jasmine + JSDom. This repo is used to help the Jest team reproduce and test https://github.com/facebook/jest/issues/6694.

## Setup

1. Install `hyperfine` via [these instructions](https://github.com/sharkdp/hyperfine#installation):
2. Install dependencies:
```sh
yarn
```

Then you can run benchmarks via:

```sh
cd <suite>
hyperfine --warmup 1 'yarn test'
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

- `jasmine` (7.336s mean)
```
Time (mean ± σ):      7.336 s ±  0.303 s    [User: 7.196 s, System: 0.912 s]
Range (min … max):    7.044 s …  7.860 s    10 runs
```
- `jest` (19.907s mean)
```
Time (mean ± σ):     19.907 s ±  2.515 s    [User: 50.052 s, System: 9.691 s]
Range (min … max):   18.115 s … 26.298 s    10 runs
```
- `jest-dot` (19.112s mean)
```
Time (mean ± σ):     19.112 s ±  0.520 s    [User: 49.242 s, System: 9.439 s]
Range (min … max):   18.385 s … 20.156 s    10 runs
```
- `vitest` (27.91s mean)
```
hyperfine fails to run vitest due to various internal errors
```

#### Conclusion

As you can see Jest is significantly slower running the exact same tests. In this case, with 710 or so specs, it's about 2 times slower even on the most modern 2019 MacBook Pro. When this is extrapolated to the size of a large project (such as the one I'm working on at my company) and/or run on older devices -- Jest ends up consuming 5 to 7 times more time and resources for our 7000+ spec test suite. So the problem gets worse with more specs, not better.

As much as we love Jest's superior developer experience, such a serious performance difference makes it very difficult for us to continue using Jest as our primary test runner. My hope is that this isolated test bed project can be used to troubleshoot and diagnose the specific reasons for the performance difference so that Jest could be optimized to run faster.

## Tests

The repository has 150 test suites in `/tests`. These will be identical files that will be processed by both Jest and Jasmine. These tests are intentionally duplicated through several replicas to increase the total number of specs to create a more consistent average run time and simulate a larger project.

## Philosophy

- Use `hyperfine` for consistent and reproducible benchmark collection
- Discard the first run (via `--warmup 1`) to let various caches build up
- Use minimal configurations (ie. stock configurations for both Jest & Jasmine)
- Tests should represent real-world scenarios (in this case, they are copies of real files used in real projects)
- Use a mixture of fast, simple tests and slow complex enzyme mounted full render tests to simulate real world scenarios
