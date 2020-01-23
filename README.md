# jest-vs-jasmine

This repo is setup to test the performance of running tests via the Jest runner vs running the same tests via Jasmine + JSDom. This repo is used to help the Jest team reproduce and test https://github.com/facebook/jest/issues/6694.

# Setup

Install deps:

```sh
cd jasmine && yarn && cd ..
cd jest && yarn && cd ..
cd jest-dot && yarn
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

And Jest (with dot reporter) tests via:

```sh
cd jest-dot
time yarn test
```

# Results

> `npx envinfo --preset jest` is used to grab the current environment settings

#### 2019 MacBook Pro

```
System:
  OS: macOS 10.15.2
  CPU: (8) x64 Intel(R) Core(TM) i5-8279U CPU @ 2.40GHz
Binaries:
  Node: 10.17.0 - ~/.nvm/versions/node/v10.17.0/bin/node
  Yarn: 1.21.1 - /usr/local/bin/yarn
  npm: 6.13.4 - ~/.nvm/versions/node/v10.17.0/bin/npm
npmPackages:
  jest: 25.1.0 => 25.1.0
```

- `jasmine`: 11.19s, 10.37s, 10.39s, 10.41s, 10.30s (**avg after first run: 10.53s**)
- `jest`: 17.95s, 17.50s, 17.48s, 17.66s, 17.76s (**avg after first run: 17.67s**)
- `jest-dot`: 19.94s, 18.52s, 19.96s, 23.69s, 17.93s (**avg after first run: 20.00s**)

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
