module.exports = {
  moduleNameMapper: {
    "\\.(less)$": "identity-obj-proxy"
  },
  resolver: require.resolve('./cached-jest-resolver'),
  moduleLoader: require.resolve('./jest-runtime'),
  roots: [
    "<rootDir>/tests"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/setupTestFrameworkScriptFile.js"
  ],
  transform: {
    "^.+\\.js$": "<rootDir>/babel-jest"
  }
}
