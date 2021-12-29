import React from 'react';
import {shallow} from 'enzyme';
import styles from './Switch.module.less';
import Switch from './Switch';

describe('<Switch />', () => {
	const shallowRender = (props, opts) => shallow(<Switch name='switch' {...props} />, opts);

	describe('basic', () => {
		let component;

		beforeAll(() => {
			component = shallowRender();
		});

		it('should be my component', () => {
			expect(component.instance() instanceof Switch).toBe(true);
		});

		it('should have the correct displayName', () => {
			expect(Switch.displayName).toEqual('Switch');
		});

		it('should have only required and default properties by default', () => {
			const {onUpdate, ...props} = component.instance().props;

			expect(props).toEqual({
				active: false,
				disabled: false,
				labelPosition: 'right',
				name: 'switch',
				size: 'regular',
			});

			expect(typeof onUpdate).toEqual('function');
		});
	});

	describe('`active` prop', () => {
		it('should add the correct class names when in `active` mode', () => {
			const component = shallowRender({active: true});
			expect(component.find('span').first().hasClass(styles.buttonActive)).toEqual(true);
			expect(component.find('span').last().hasClass(styles.innerLabelTextActive)).toEqual(true);
		});

		it('should not fail if the `active` prop comes in as a `null` for some reason [C8-2471]', () => {
			expect(() => {
				const component = shallowRender({active: null});
				expect(component.find('button').props()['aria-checked']).toEqual('false');
			}).not.toThrow();
		});

		it('should render one span when `disabled` prop is set to true', () => {
			const component = shallowRender({active: null, disabled: true});
			expect(component.find(`.${styles.buttonContainer}`).find('span').length).toEqual(1);
		});

		it('should render two spans in a Fragment when `disabled` prop is set to false', () => {
			const component = shallowRender({active: null, disabled: false});
			expect(component.find(`.${styles.buttonContainer}`).find('span').length).toEqual(2);
		});
	});

	describe('`onUpdate` prop', () => {
		it('should submit the correct data to the `onUpdate` callback', () => {
			const spy = jasmine.createSpy();
			const component = shallowRender({active: true, onUpdate: spy});
			component.simulate('click', document.createEvent('Event'));
			expect(spy).toHaveBeenCalledWith(false, {switch: false});
		});
	});

	describe('label', () => {
		it('should add a label on the right side of the switch by default', () => {
			const component = shallowRender({label: 'label'});
			const labelClass = component.children().last().props().className;
			expect(labelClass).toContain(styles.outerLabelRight);
		});

		it('should add a label on the left side of the switch when defined', () => {
			const component = shallowRender({label: 'label', labelPosition: 'left'});
			const labelClass = component.children().first().props().className;
			expect(labelClass).toContain(styles.outerLabelLeft);
		});
	});
});
