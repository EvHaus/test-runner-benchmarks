import {JSDOM, VirtualConsole} from 'jsdom';
import hook from 'css-modules-require-hook';
import localStorage from 'localStorage';
import {parse} from 'postcss-less';

const flattenLessRules = function (node, parentNode) {
	if (parentNode && node.selector && node.selector[0] === '&') {
		node.selector = `${parentNode.selector}${node.selector.substring(1)}`;
	}

	if (node.nodes && node.nodes.length) {
		node.nodes.forEach((childNode) => {
			flattenLessRules(childNode, node);
		});
	}
};

// Support for CSS modules
hook({
	extensions: '.less',
	generateScopedName: '[local]',
	processorOpts: {
		parser: (less, opts) => {
			const result = parse(less, opts);

			// Flatten nested extended LESS rules (eg. `.foo { &bar {} }`)
			result.nodes = result.nodes.map((node) => {
				flattenLessRules(node, null);
				return node;
			});

			return result;
		},
	},
});

const dom = new JSDOM('<!DOCTYPE html>', {
	pretendToBeVisual: true,
	runScripts: 'dangerously',
	virtualConsole: new VirtualConsole().sendTo(console),
});

// Register additional JSDOM polyfills
Object.defineProperty(dom.window, 'cancelAnimationFrame', {value: () => {}});
Object.defineProperty(dom.window, 'localStorage', {value: localStorage});
Object.defineProperty(dom.window, 'requestAnimationFrame', {
	value: (callback) => {
		setTimeout(callback, 0);
	},
});
Object.defineProperty(dom.window, 'sessionStorage', {value: localStorage});

// Register window
global.window = dom.window;

// Register global window extensions
[
	'document',
	'cancelAnimationFrame',
	'getComputedStyle',
	'HTMLCanvasElement',
	'HTMLElement',
	'HTMLInputElement',
	'localStorage',
	'navigator',
	'requestAnimationFrame',
	'sessionStorage'
].forEach((key) => {
	global[key] = global.window[key];
});

// Enzyme needs to be loaded after globals and JSDOM are set
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
const Enzyme = require('enzyme');

Enzyme.configure({adapter: new Adapter()});
