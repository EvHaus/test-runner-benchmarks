# jest-vs-jasmine

This repo is setup to test the performance of running tests via the Jest runner vs running the same tests via Jasmine + JSDom.

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
  Node: 10.7.0 - /usr/local/bin/node
  Yarn: 1.9.2 - /usr/local/bin/yarn
  npm: 6.1.0 - /usr/local/bin/npm
```

- `jasmine`: 31.08s, 15.23s, 13.09s, 13.06s, 16.06s (**avg. 17.70s**)
- `jest`: 57.36s, 32.38s, 25.76s, 22.46s, 28.89s (**avg. 33.37s**)
- `jest-dot`: 73.48s, 26.94s, 26.28s, 25.66s, 29.31s (**avg. 36.33s**)

#### Windows PC (via Bash on Windows)

```
System:
  OS: Linux 4.4 Ubuntu 16.04.4 LTS (Xenial Xerus)
  CPU: x64 Intel(R) Core(TM) i7 CPU         930  @ 2.80GHz

Binaries:
  Node: 10.4.1 - /usr/bin/node
  Yarn: 1.7.0 - /usr/bin/yarn
  npm: 6.1.0 - /usr/bin/npm
```

- `jasmine`: 22.81s, 11.37s, 11.28s, 11.67s, 11.27s (**avg. 13.68s**)
- `jest`: 31.19s, 24.00s, 22.56s, 22.98s, 23.22s (**avg. 24.79s**)

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
