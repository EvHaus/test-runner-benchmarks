import NavItem from './NavItem';
import React from 'react';
import {shallow} from 'enzyme';
import styles from './NavItem.less';

describe('<NavItem />', () => {
	const shallowRender = (props) => shallow(<NavItem {...props} />);

	it('should be my component', () => {
		expect(shallowRender().instance() instanceof NavItem).toBe(true);
	});

	it('should return a `<div />`', () => {
		expect(shallowRender().type()).toBe('div');
	});

	it('should have the correct displayName', () => {
		expect(NavItem.displayName).toEqual('NavItem');
	});

	it('should have default properties set', () => {
		const component = shallowRender();
		const {onClick, onClose, ...nonFunctionalProps} = component.instance().props;

		expect(nonFunctionalProps).toEqual({
			closeIcon: false,
			disabled: false,
			divider: false,
		});

		expect(typeof onClick).toEqual('function');
		expect(typeof onClose).toEqual('function');
	});

	it('should called the `onClick` handler when clicking the NavItem', () => {
		const clickSpy = jasmine.createSpy();
		const eventKey = 'something';
		const component = shallowRender({
			eventKey,
			onClick: clickSpy,
		});

		// Find the <a /> element and click on it
		const link = component.find('a');
		link.simulate('click', {
			stopPropagation: () => {},
		});

		// Ensure event was fired
		expect(clickSpy).toHaveBeenCalledWith(jasmine.any(Object), jasmine.any(Object), eventKey);
	});

	it('should support React Elements as the `label`', () => {
		const label = <span className='somethingCustom'>Test</span>;
		const component = shallowRender({label});

		// Find the custom element
		const customChild = component.find(label);

		expect(customChild).toBeDefined();
	});

	it('should render a close icon button if `closeIcon` prop is set', () => {
		const component = shallowRender({closeIcon: true});
		const button = component.find(`.${styles.closeIcon}`);
		expect(button.length).toEqual(1);
	});

	it('should render an item icon button if `icon` prop is set', () => {
		const component = shallowRender({icon: 'add'});
		const button = component.find(`.${styles.icon}`);
		expect(button.length).toEqual(1);
	});

	it('should render a custom icon button if `icon` prop is set as a component', () => {
		const component = shallowRender({icon: <span className='customicon' />});
		const button = component.find(`.customicon`);
		expect(button.length).toEqual(1);
	});

	it('should support the `title` prop', () => {
		const component = shallowRender({title: 'feeling lazy'});
		const node = component.first().props();
		expect(node.title).toEqual('feeling lazy');
	});

	it('should use the string `label` as the `title` value', () => {
		const component = shallowRender({label: 'feeling lazy'});
		const node = component.first().props();
		expect(node.title).toEqual('feeling lazy');
	});

	it('should not use the React.Element `label` as the `title` value', () => {
		const component = shallowRender({label: <span>Just kidding</span>});
		const node = component.first().props();
		expect(node.title).toEqual(undefined);
	});

	it('should use the `aria-label` as the `title` value', () => {
		const component = shallowRender({'aria-label': 'feeling lazy'});
		const node = component.first().props();
		expect(node.title).toEqual('feeling lazy');
	});

	it('should not call `onClick` if we\'re in a `disabled` state', () => {
		const onClick = jasmine.createSpy();
		const event = document.createEvent('Event');
		const component = shallowRender({disabled: true, onClick});
		component.instance()._handleClick(event);
		expect(onClick).not.toHaveBeenCalled();
	});

	it('should not call `onClick` if we\'re using a `href` prop, should change the location instead', () => {
		const onClick = jasmine.createSpy();
		const event = document.createEvent('Event');
		const component = shallowRender({href: '#magicplace', onClick});
		component.instance()._handleClick(event);
		expect(onClick).not.toHaveBeenCalled();
	});

	it('should call `onClose` when a close request is triggered', () => {
		const stopPropagation = jasmine.createSpy();
		const onClose = jasmine.createSpy();
		const event = {stopPropagation};
		const eventKey = 'test';
		const component = shallowRender({eventKey, onClose});
		component.instance()._handleClose(event);
		expect(stopPropagation).toHaveBeenCalled();
		expect(onClose).toHaveBeenCalledWith(event, component.instance(), eventKey);
	});

	it('should trigger `onClose` when middle clicking', () => {
		const onClose = jasmine.createSpy();
		const eventKey = 'test';
		const component = shallowRender({closeIcon: true, eventKey, onClose});
		component.find('a').simulate('mouseup', {nativeEvent: {which: 2}, stopPropagation: () => {}});
		expect(onClose).toHaveBeenCalledWith(jasmine.any(Object), component.instance(), eventKey);
	});

	it('should not trigger `onClose` when middle clicking if the element is disabled', () => {
		const onClose = jasmine.createSpy();
		const component = shallowRender({closeIcon: true, disabled: true, onClose});
		component.find('a').simulate('mouseup', {nativeEvent: {which: 2}, stopPropagation: () => {}});
		expect(onClose).not.toHaveBeenCalled();
	});

	it('should prevent default on mouse drag events', () => {
		const event = document.createEvent('MouseEvent');
		const spy = spyOn(event, 'preventDefault');
		const component = shallowRender();
		component.instance()._handleNativeDragStart(event);
		expect(spy).toHaveBeenCalled();
	});

	it('should support `Enter` key for activating the `onClick` handler', () => {
		const eventKey = '123';
		const onClick = jasmine.createSpy();
		const event = {keyCode: 13};
		const component = shallowRender({eventKey, onClick});
		component.instance()._handleKeyDown(event);
		expect(onClick).toHaveBeenCalledWith(event, component.instance(), eventKey);
	});

	it('should support `Spacebar` key for activating the `onClick` handler', () => {
		const eventKey = '123';
		const onClick = jasmine.createSpy();
		const event = {keyCode: 32};
		const component = shallowRender({eventKey, onClick});
		component.instance()._handleKeyUp(event);
		expect(onClick).toHaveBeenCalledWith(event, component.instance(), eventKey);
	});
});
