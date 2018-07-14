import Clickable from './Clickable';
import React from 'react';
import {shallow} from 'enzyme';

describe('<Clickable />', () => {

	const DEFAULT_PROPS = {onClick: () => {}};
	const shallowRender = (props, opts) => shallow(<Clickable {...DEFAULT_PROPS} {...props} />, opts);

	// =========================================================================

	it('should be my component', () => {
		const component = shallowRender({});
		expect(component.instance() instanceof Clickable).toBe(true);
	});

	it('should have the correct displayName', () => {
		expect(Clickable.displayName).toEqual('Clickable');
	});

	describe('Acting as `<button />`', () => {
		it('should trigger the `onClick` prop when clicked', () => {
			const clickSpy = jasmine.createSpy('onClick');
			const component = shallowRender({onClick: clickSpy});
			component.find('button').simulate('click');
			expect(clickSpy).toHaveBeenCalled();
		});
	});

	describe('Acting as `<a />`', () => {
		it('should trigger the `onClick` prop when clicked', () => {
			const clickSpy = jasmine.createSpy('onClick');
			const component = shallowRender({asButton: false, onClick: clickSpy});
			component.find('a').simulate('click');
			expect(clickSpy).toHaveBeenCalled();
		});
	});

});
