import UXPropTypes from './UXPropTypes';

describe('UXPropTypes', () => {
	describe('theme', () => {
		it('should return a function', () => {
			expect(typeof UXPropTypes.theme).toEqual('function');
		});
	});
});
