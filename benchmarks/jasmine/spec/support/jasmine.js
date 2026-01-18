module.exports = {
  env: {
    forbidDuplicateNames: false,
    stopSpecOnExpectationFailure: false,
    random: true
  },
  helpers: [
    "spec/helpers/**/*.ts"
  ],
  spec_dir: ".",
  spec_files: [
    "tests/**/*.test.*"
  ]
}