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

- `jasmine`: A suite that has only the configuration needed to run the tests via Jasmine + JSDom
- `jest`: A suite that has only the configuration needed to run the tests via Jest.
- `jest-dot`: [It was suggested](https://github.com/facebook/jest/issues/6694#issuecomment-409574937) that using Jest's dot reporter might result in faster performance. This suite is identical to `jest` but uses the dot reporter to test that hypothesis.

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

- `jasmine` (13.594s mean)
```
Time (mean ± σ):     13.594 s ±  2.886 s    [User: 12.821 s, System: 1.390 s]
Range (min … max):   11.453 s … 21.055 s    10 runs
```
- `jest` (33.858s mean)
```
Time (mean ± σ):     33.858 s ±  1.424 s    [User: 87.981 s, System: 16.480 s]
Range (min … max):   32.604 s … 36.950 s    10 runs
```
- `jest-dot` (33.444s mean)
```
Time (mean ± σ):     33.444 s ±  0.780 s    [User: 87.702 s, System: 16.301 s]
Range (min … max):   32.562 s … 35.039 s    10 runs
```

#### Conclusion

As you can see Jest is significantly slower running the exact same tests. In this case, with 750 or so specs, it's about 2 times slower even on the most modern 2019 MacBook Pro. When this is extrapolated to the size of a large project (such as the one I'm working on at my company) and/or run on older devices -- Jest ends up consuming 5 to 7 times more time and resources for our 7000+ spec test suite. So the problem gets worse with more specs, not better.

As much as we love Jest's superior developer experience, such a serious performance difference makes it very difficult for us to continue using Jest as our primary test runner. My hope is that this isolated test bed project can be used to troubleshoot and diagnose the specific reasons for the performance difference so that Jest could be optimized to run faster.

## Tests

The repository has 150 test suites in `/tests`. These will be identical files that will be processed by both Jest and Jasmine. These tests are intentionally duplicated through several replicas to increase the total number of specs to create a more consistent average run time and simulate a larger project.

## Philosophy

- Use `hyperfine` for consistent and reproducible benchmark collection
- Discard the first run (via `--warmup 1`) to let various caches build up
- Use minimal configurations (ie. stock configurations for both Jest & Jasmine)
- Tests should represent real-world scenarios (in this case, they are copies of real files used in real projects)
- Use a mixture of fast, simple tests and slow complex enzyme mounted full render tests to simulate real world scenarios
