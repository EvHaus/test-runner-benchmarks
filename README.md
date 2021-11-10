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
- `jest-goloveychuk`: [GitHub user @goloveychuk suggested a solution](https://github.com/facebook/jest/issues/6694#issuecomment-814234244) which reduces Jest's memory usage. This suite is identical to `jest` but uses the configuration provided in that comment.

## Results

> `npx envinfo --preset jest` is used to grab the current environment settings

#### 2019 MacBook Pro

```
System:
  OS: macOS 11.6.1
  CPU: (8) x64 Intel(R) Core(TM) i5-8279U CPU @ 2.40GHz
Binaries:
  Node: 14.17.5 - ~/.nvm/versions/node/v14.17.5/bin/node
  Yarn: 3.1.0 - ~/.nvm/versions/node/v14.17.5/bin/yarn
  npm: 6.14.14 - ~/.nvm/versions/node/v14.17.5/bin/npm
```

- `jasmine` (11.399s mean)
```
Time (mean ± σ):     11.399 s ±  1.589 s    [User: 10.923 s, System: 1.083 s]
Range (min … max):   10.093 s … 15.451 s    10 runs
```
- `jest` (23.014s mean)
```
Time (mean ± σ):     23.014 s ±  0.651 s    [User: 55.360 s, System: 13.151 s]
Range (min … max):   21.642 s … 24.036 s    10 runs
```
- `jest-dot` (20.152s mean)
```
Time (mean ± σ):     20.152 s ±  1.317 s    [User: 53.228 s, System: 12.591 s]
Range (min … max):   18.871 s … 23.659 s    10 runs
```
- `jest-goloveychuk` (17.987s mean)
```
Time (mean ± σ):     17.987 s ±  0.437 s    [User: 60.725 s, System: 5.391 s]
Range (min … max):   17.285 s … 18.834 s    10 runs
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
