# jest-vs-jasmine

This repo is setup to test the performance of running tests via the Jest runner vs running the same tests via Jasmine + JSDom.

# Setup

Install deps:

```sh
cd jasmine && yarn && cd ..
cd jest && yarn
```

Then you can run Jasmine tests via:

```sh
cd jasmine
time yarn test
```

And Jest tests via:

```sh
cd jest
time yarn test
```

# Results

> `npx envinfo --preset jest` is used to grab the current environment settings

#### 2015 MacBook Pro

```
System:
OS: macOS 10.14
CPU: x64 Intel(R) Core(TM) i5-5257U CPU @ 2.70GHz

Binaries:
Node: 10.6.0 - /usr/local/bin/node
Yarn: 1.7.0 - /usr/local/bin/yarn
npm: 6.1.0 - /usr/local/bin/npm
```
- `jest`: 45.13s, 27.39s, 21.77s, 25.35s, 33.89s (**avg. 30.71s**)
- `jasmine`: 19.94s, 11.84s, 8.92s, 9.31s, 9.48s (**avg. 11.90s**)

#### Conclusion

As you can see Jest is significantly slower running the exact same tests. In this case, with 750 or so specs, it's about 3 times slower. When this is extrapolated to the size of a large project (such as the one I'm working on at my company) -- Jest ends up consuming 5 to 7 times more time and resources for our 7000+ spec test suite. So the problem gets worse with more specs, not better.

As much as we love Jest's superior developer experience, such a serious performance difference makes it very difficult for us to continue using Jest as our primary test runner. My hope is that this isolated test bed project can be used to troubleshoot and diagnose the specific reasons for the performance difference so that Jest could be optimized to run faster.

# Repo Structure

How this repo is setup:

- *jasmine*: A project that has only the configuration needed to run the tests via Jasmine + JSDom
- *jest*: A project that has only the configuration needed to run the tests via Jest.
- *tests*: Has 150 test suites we want to run. These will be identical files that will be processed by both Jest and Jasmine. These tests are intentionally duplicated through several replicas to increase the total number of specs to create a more consistent average run time and simulate a larger project.

# Philosophy

- `time yarn test` are used to get measurements
- 5x runs are performed and every time is recorded (since Jest caches things, the first and subsequent runs will have different speeds, we want to capture them all for comparison)
- Use minimal configurations (ie. stock configurations for both Jest & Jasmine)
- Tests should represent real-world scenarios (in this case, they are copies of real files used in real projects)
- Use a mixture of fast, simple test and slow complex enzyme mounted full render tests to simulate real world scenarios
