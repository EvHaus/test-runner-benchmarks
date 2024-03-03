import { Window } from 'happy-dom';

// Setup happy-dom
const window = new Window();
global.window = window;

// Register global window extensions
[
	'document',
	'navigator',
	'Element',
	'getComputedStyle',
	'HTMLElement',
	'SVGElement'
].forEach((key) => {
	try {
		global[key] = global.window[key];
	} catch (e) {
		// NOTE: This is need for running tests on GitHub Actions CI, but causes
		// failure on local builds due to this error:
		// > Cannot set property navigator of #<Object> which has only a getter
		if (!e.message.includes('Cannot set property navigator')) {
			throw e;
		}
	}
});