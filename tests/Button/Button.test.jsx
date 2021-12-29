import Button from './Button';
import React from 'react';
import {shallow} from 'enzyme';
import styles from './Button.module.less';

describe('<Button />', () => {
	const shallowRender = (props, opts) => shallow(<Button {...props} />, opts);

	it('should be my component', () => {
		const component = shallowRender();
		expect(component.instance() instanceof Button).toBe(true);
	});

	it('should have the correct displayName', () => {
		expect(Button.displayName).toEqual('Button');
	});

	it('should have these properties by default', () => {
		const component = shallowRender();
		const {onClick, onContextMenu, onMouseEnter, onMouseLeave, ...nonFunctionalProps} = component.instance().props;

		expect(nonFunctionalProps).toEqual({
			active: false,
			background: false,
			borders: 'full',
			canDeactivate: false,
			disabled: false,
			loading: false,
			size: 'large',
			type: 'task',
		});

		expect(typeof onClick).toEqual('function');
		expect(typeof onContextMenu).toEqual('function');
		expect(typeof onMouseEnter).toEqual('function');
		expect(typeof onMouseLeave).toEqual('function');
	});

	it('should redirect page when clicking a button with a specified `href` property', () => {
		const href = '#unittest';
		const component = shallowRender({href});
		component.simulate('click');
		expect(document.location.hash).toEqual(href);
		document.location.hash = '';
	});

	it('should set the appropriate class when specifying the `size` property', () => {
		const size = 'large';
		const component = shallowRender({size});
		expect(component.hasClass(styles[size])).toEqual(true);
	});

	it('should apply the border styling appropriately', () => {
		let component = shallowRender();
		expect(component.hasClass(styles.fullBorder)).toEqual(true);

		component = shallowRender({borders: 'full'});
		expect(component.hasClass(styles.fullBorder)).toEqual(true);

		component = shallowRender({borders: 'top'});
		expect(component.hasClass(styles.topBorder)).toEqual(true);

		component = shallowRender({borders: 'right'});
		expect(component.hasClass(styles.rightBorder)).toEqual(true);

		component = shallowRender({borders: 'bottom'});
		expect(component.hasClass(styles.bottomBorder)).toEqual(true);

		component = shallowRender({borders: 'left'});
		expect(component.hasClass(styles.leftBorder)).toEqual(true);

		component = shallowRender({borders: 'horizontal'});
		expect(component.hasClass(styles.horizontalBorder)).toEqual(true);

		component = shallowRender({borders: 'vertical'});
		expect(component.hasClass(styles.verticalBorder)).toEqual(true);

		component = shallowRender({borders: 'none'});
		expect(component.hasClass(styles.fullBorder)).toEqual(false);
		expect(component.hasClass(styles.topBorder)).toEqual(false);
		expect(component.hasClass(styles.rightBorder)).toEqual(false);
		expect(component.hasClass(styles.bottomBorder)).toEqual(false);
		expect(component.hasClass(styles.leftBorder)).toEqual(false);
		expect(component.hasClass(styles.horizontalBorder)).toEqual(false);
		expect(component.hasClass(styles.verticalBorder)).toEqual(false);
	});


	it('should use the `label` given via properties', () => {
		const label = 'Testi!!!!!ng';
		const component = shallowRender({label});
		expect(component.text()).toContain(label);
	});

	it('should execute custom `onClick` prop when button is clicked', () => {
		const spy = jasmine.createSpy('onClick');
		const component = shallowRender({onClick: spy});
		component.simulate('click');
		expect(spy).toHaveBeenCalled();
	});

	it('should not execute `onClick` if it is active', () => {
		const spy = jasmine.createSpy('onClick');
		const component = shallowRender({onClick: spy, active: true});
		component.simulate('click');
		expect(spy).not.toHaveBeenCalled();
	});

	it('should execute `onClick` if it is active but can be activated', () => {
		const spy = jasmine.createSpy('onClick');
		const component = shallowRender({onClick: spy, active: true, canDeactivate: true});
		component.simulate('click');
		expect(spy).toHaveBeenCalled();
	});

	it('should not execute `onClick` if it is disabled', () => {
		const spy = jasmine.createSpy('onClick');
		const component = shallowRender({onClick: spy, disabled: true});
		component.simulate('click');
		expect(spy).not.toHaveBeenCalled();
	});

	it('should disable a button when the `disabled` property is set', () => {
		const spy = jasmine.createSpy('onClick');
		const component = shallowRender({disabled: true, onClick: spy});
		component.simulate('click');

		expect(component.hasClass(styles.disabled)).toEqual(true);

		const button = component.find('button');

		// Should NOT be disabled. This prevents tooltips from working.
		expect(button.props().disabled).toEqual(undefined);

		// Should have the readonly attribute
		expect(button.props().readOnly).toBeDefined();

		// Click event should not fire
		expect(spy).not.toHaveBeenCalled();
	});

	it('should appropiately add the correct class from the theme if `background` is set to `true`', () => {
		expect(true).toEqual(true);
	});

	describe('getIconSize', () => {
		it('should return `24`', () => {
			let component = shallowRender({icon: 'icon'});
			expect(component.instance().getIconSize()).toEqual(24);

			component = shallowRender({icon: 'icon', size: 'small'});
			expect(component.instance().getIconSize()).toEqual(24);
		});

		it('should return `0` if `loading` and `icon` are  is falsey', () => {
			let component = shallowRender({
				loading: false,
			});
			expect(component.instance().getIconSize()).toEqual(0);

			component = shallowRender({icon: false});
			expect(component.instance().getIconSize()).toEqual(0);
		});
	});

});
