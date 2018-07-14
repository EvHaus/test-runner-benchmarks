import {mount, shallow} from 'enzyme';
import React from 'react';
import WithBodyClick from './WithBodyClick';

describe('<WithBodyClick />', () => {
	const fullRender = (props) => mount(<WithBodyClick {...props}><span /></WithBodyClick>);
	const shallowRender = (props) => shallow(<WithBodyClick {...props}><span /></WithBodyClick>);

	it('should be my component', () => {
		const component = shallowRender();
		expect(component.instance() instanceof WithBodyClick).toBe(true);
	});

	it('should have the correct displayName', () => {
		expect(WithBodyClick.displayName).toEqual('WithBodyClick');
	});

	it('should have these properties by default', () => {
		const component = shallowRender();
		const {children, onBodyClick, ...nonFunctionalProps} = component.instance().props;
		expect(children).toBeDefined();
		expect(nonFunctionalProps).toEqual({});
		expect(typeof onBodyClick).toEqual('function');
	});

	it('should attach a body click handler on mount', () => {
		const onBodyClick = jasmine.createSpy();
		const component = fullRender({onBodyClick});
		const evt = document.createEvent('MouseEvents');
		evt.initEvent('click', true, false);
		document.body.dispatchEvent(evt);
		expect(onBodyClick).toHaveBeenCalledWith(evt);
		component.unmount();
	});

	it('should unattach a body click handler on unmount', () => {
		const onBodyClick = jasmine.createSpy();
		const component = fullRender({onBodyClick});
		component.unmount();
		const evt = document.createEvent('MouseEvents');
		evt.initEvent('click', true, false);
		document.body.dispatchEvent(evt);
		expect(onBodyClick).not.toHaveBeenCalled();
	});
});
