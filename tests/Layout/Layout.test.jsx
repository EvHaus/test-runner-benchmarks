import {mount, shallow} from 'enzyme';
import Layout from './Layout';
import React from 'react';


describe('<Layout />', () => {
	const shallowRender = (props) => shallow(<Layout {...props} />);
	const fullRender = (props) => mount(<Layout {...props} />);

	it('should be my component', () => {
		const component = shallowRender();
		expect(component.instance() instanceof Layout).toBe(true);
	});

	it('should have the correct displayName', () => {
		expect(Layout.displayName).toEqual('Layout');
	});

	it('should test prop changes', () => {
		const component = shallowRender();
		expect(() => {
			component.setProps({fixedWidth: null});
		}).not.toThrow();
	});

	it('should set a style with fixed values', () => {
		const component = shallowRender({fixedHeight: 1, fixedWidth: 2});
		expect(component.find('div').first().props().style).toEqual({height: 1, width: 2});
	});

	it('should accept a `divRef` prop that attaches to the Layout\'s div', () => {
		const component = fullRender({divRef: 'fakeRef'});
		expect(component.ref('fakeRef').tagName).toEqual('DIV');
	});
});
