import hook from 'css-modules-require-hook';

// Support for CSS modules
hook({
	generateScopedName: '[name]__[local]___[hash:base64:5]',
});