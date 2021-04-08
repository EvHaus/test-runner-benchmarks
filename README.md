# jest-vs-jasmine

This repo is setup to test the performance of running tests via the Jest runner vs running the same tests via Jasmine + JSDom. This repo is used to help the Jest team reproduce and test https://github.com/facebook/jest/issues/6694.

# Setup

1. Install `hyperfine` via [these instructions](https://github.com/sharkdp/hyperfine#installation):
2. Install dependencies:
```sh
cd jasmine && yarn && cd ..
cd jest && yarn && cd ..
cd jest-dot && yarn
```

Then you can run benchmarks via:

```sh
cd <suite>
hyperfine --warmup 1 'yarn test'
```

> Where `<suite>` is one of: `jasmine`, `jest` or `jest-dot`.

# Results

> `npx envinfo --preset jest` is used to grab the current environment settings

#### 2019 MacBook Pro

```
System:
  OS: macOS 11.2.3
  CPU: (8) x64 Intel(R) Core(TM) i5-8279U CPU @ 2.40GHz
Binaries:
  Node: 14.16.0 - ~/.nvm/versions/node/v14.16.0/bin/node
  Yarn: 1.22.10 - /usr/local/bin/yarn
  npm: 6.14.11 - ~/.nvm/versions/node/v14.16.0/bin/npm
npmPackages:
  jest: 26.6.3 => 26.6.3
```

- `jasmine` (10.031s mean)
```
Time (mean ± σ):     10.031 s ±  0.202 s    [User: 10.206 s, System: 0.814 s]
Range (min … max):    9.794 s … 10.361 s    10 runs
```
- `jest` (30.367s mean)
```
Time (mean ± σ):     30.367 s ±  5.164 s    [User: 67.613 s, System: 15.923 s]
Range (min … max):   25.591 s … 39.151 s    10 runs
```
- `jest-dot` (25.630s mean)
```
Time (mean ± σ):     25.630 s ±  0.730 s    [User: 65.405 s, System: 14.852 s]
Range (min … max):   24.949 s … 27.117 s    10 runs
```

#### Conclusion

As you can see Jest is significantly slower running the exact same tests. In this case, with 750 or so specs, it's about 2 times slower even on the most modern 2019 MacBook Pro. When this is extrapolated to the size of a large project (such as the one I'm working on at my company) and/or run on older devices -- Jest ends up consuming 5 to 7 times more time and resources for our 7000+ spec test suite. So the problem gets worse with more specs, not better.

As much as we love Jest's superior developer experience, such a serious performance difference makes it very difficult for us to continue using Jest as our primary test runner. My hope is that this isolated test bed project can be used to troubleshoot and diagnose the specific reasons for the performance difference so that Jest could be optimized to run faster.

# Repo Structure

How this repo is setup:

- _jasmine_: A project that has only the configuration needed to run the tests via Jasmine + JSDom
- _jest_: A project that has only the configuration needed to run the tests via Jest.
- _jest-dot_: [It was suggested](https://github.com/facebook/jest/issues/6694#issuecomment-409574937) that using Jest's dot reporter might result in faster performance. This project is identical to `jest` but uses the dot reporter to test that hypothesis.
- _tests_: Has 150 test suites we want to run. These will be identical files that will be processed by both Jest and Jasmine. These tests are intentionally duplicated through several replicas to increase the total number of specs to create a more consistent average run time and simulate a larger project.

# Philosophy

- `time yarn test` are used to get measurements
- 5x runs are performed and every time is recorded (since Jest caches things, the first and subsequent runs will have different speeds, we want to capture them all for comparison)
- Use minimal configurations (ie. stock configurations for both Jest & Jasmine)
- Tests should represent real-world scenarios (in this case, they are copies of real files used in real projects)
- Use a mixture of fast, simple tests and slow complex enzyme mounted full render tests to simulate real world scenarios
