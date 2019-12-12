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
  npm: 6.13.3 - ~/.nvm/versions/node/v10.17.0/bin/npm
```

- `jasmine`: 19.525s, 9.700s, 9.766s, 9.770s, 9.754s (**avg after first run. 9.75s**)
- `jest`: 27.532s, 18.820s, 18.893s, 18.776s, 17.879s (**avg after first run. 18.59s**)
- `jest-dot`: 26.020s, 19.123s, 18.783s, 17.616s, 17.925s (**avg after first run. 18.36s**)

#### Conclusion

As you can see Jest is significantly slower running the exact same tests. In this case, with 750 or so specs, it's about 2 times slower even on the most modern 2019 MacBook Pro. When this is extrapolated to the size of a large project (such as the one I'm working on at my company) and/or run on older devices -- Jest ends up consuming 5 to 7 times more time and resources for our 7000+ spec test suite. So the problem gets worse with more specs, not better.

As much as we love Jest's superior developer experience, such a serious performance difference makes it very difficult for us to continue using Jest as our primary test runner. My hope is that this isolated test bed project can be used to troubleshoot and diagnose the specific reasons for the performance difference so that Jest could be optimized to run faster.

# Repo Structure

How this repo is setup:

- _jasmine_: A project that has only the configuration needed to run the tests via Jasmine + JSDom
- _jest_: A project that has only the configuration needed to run the tests via Jest.
- _tests_: Has 150 test suites we want to run. These will be identical files that will be processed by both Jest and Jasmine. These tests are intentionally duplicated through several replicas to increase the total number of specs to create a more consistent average run time and simulate a larger project.

# Philosophy

- `time yarn test` are used to get measurements
- 5x runs are performed and every time is recorded (since Jest caches things, the first and subsequent runs will have different speeds, we want to capture them all for comparison)
- Use minimal configurations (ie. stock configurations for both Jest & Jasmine)
- Tests should represent real-world scenarios (in this case, they are copies of real files used in real projects)
- Use a mixture of fast, simple tests and slow complex enzyme mounted full render tests to simulate real world scenarios
