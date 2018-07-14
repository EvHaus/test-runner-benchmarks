import {shallow} from 'enzyme';
import Menu from './Menu';
import React from 'react';

describe('<Menu />', () => {
	const shallowRender = (props) => shallow(<Menu {...props} />);

	it('should be my component', () => {
		const component = shallowRender();
		expect(component.instance() instanceof Menu).toBe(true);
	});

	it('should have the correct displayName', () => {
		expect(Menu.displayName).toEqual('Menu');
	});
});
