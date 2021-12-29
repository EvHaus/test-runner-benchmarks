import {mount, shallow} from 'enzyme';
import Pane from './Pane';
import React from 'react';


describe('<Pane />', () => {
	const shallowRender = (props) => shallow(<Pane {...props} />);
	const fullRender = (props) => mount(<Pane {...props} />);

	it('should be my component', () => {
		const component = shallowRender();
		expect(component.instance() instanceof Pane).toBe(true);
	});

	it('should have the correct displayName', () => {
		expect(Pane.displayName).toEqual('Pane');
	});

	it('should allow and set a `fixedHeight` of 0 (to allow for animations)', () => {
		const component = shallowRender({fixedHeight: 0});
		expect(component.get(0).props.style.height).toEqual(0);
	});

	it('should allow and set a `fixedWidth` of 0 (to allow for animations)', () => {
		const component = shallowRender({fixedWidth: 0});
		expect(component.get(0).props.style.width).toEqual(0);
	});

	it('should set the right class when `width` is set', () => {
		const component = shallowRender({width: 7});
		expect(component.get(0).props.className).toContain('width-7');
	});

	it('should set the right class when `height` is set', () => {
		const component = shallowRender({height: 5});
		expect(component.get(0).props.className).toContain('height-5');
	});

	it('should handle updates', () => {
		const component = shallowRender();
		expect(() => {
			component.setProps({checked: true});
		}).not.toThrow();
	});

	it('should accept a `divRef` prop that attaches to the pane\'s div', () => {
		const component = fullRender({divRef: 'fakeRef'});
		expect(component.ref('fakeRef').tagName).toEqual('DIV');
	});
});
