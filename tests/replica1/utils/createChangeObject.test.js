import createChangeObject from './createChangeObject';

describe('createChangeObject', () => {
	it('should return an object for simple names', () => {
		const key = 'key';
		const value = 'value';
		expect(createChangeObject(key, value)).toEqual({[key]: value});
	});
});
