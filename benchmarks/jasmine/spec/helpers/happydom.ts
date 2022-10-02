import { Window } from 'happy-dom';

// Setup happy-dom
const window = new Window();
global.window = window;

// Register global window extensions
[
	'document',
	'Element',
	'getComputedStyle',
	'HTMLCanvasElement',
	'HTMLElement',
	'HTMLInputElement',
	'navigator',
	'SVGElement'
].forEach((key) => {
	global[key] = global.window[key];
});