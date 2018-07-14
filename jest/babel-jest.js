/* eslint-disable import/no-commonjs */

// This is a necessary hack for: https://github.com/facebook/jest/issues/6573

const path = require('path');
const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
	configFile: path.resolve(__dirname, '.babelrc'),
});
