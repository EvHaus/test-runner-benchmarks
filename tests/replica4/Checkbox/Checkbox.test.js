import Checkbox from './Checkbox';
import React from 'react';
import {shallow} from 'enzyme';
import styles from './Checkbox.less';

describe('<Checkbox />', () => {
	const shallowRender = (props) => (
		shallow(<Checkbox name='hello' {...props} />)
	);

	it('should be my component', () => {
		const component = shallowRender();
		expect(component.instance() instanceof Checkbox).toBe(true);
	});

	it('should have the correct displayName', () => {
		expect(Checkbox.displayName).toEqual('Checkbox');
	});

	it('should have these properties by default', () => {
		const component = shallowRender();
		const {onUpdate, ...nonFunctionalProps} = component.instance().props;

		expect(typeof onUpdate).toEqual('function');

		expect(nonFunctionalProps).toEqual({
			checked: false,
			disabled: false,
			name: 'hello',
		});
	});

	it('should always be assigned the correctclass', () => {
		const component = shallowRender();
		expect(component.hasClass(styles.main)).toEqual(true);
	});

	describe('when enabled', () => {
		it('should not have the disabled class applied', () => {
			const component = shallowRender({disabled: false});
			expect(component.hasClass(styles.disabled)).toEqual(false);
		});

		it('should execute custom `onUpdate` prop when button is clicked', () => {
			const onUpdate = jasmine.createSpy('onUpdate');
			const component = shallowRender({disabled: false, onUpdate});
			component.simulate('click');
			expect(onUpdate).toHaveBeenCalled();
		});

		it('should execute custom `onUpdate` prop when the Spacebar key is pressed', () => {
			const onUpdate = jasmine.createSpy('onUpdate');
			const component = shallowRender({disabled: false, onUpdate});
			component.simulate('keyDown', {keyCode: 32});
			expect(onUpdate).toHaveBeenCalled();
		});
	});

	describe('when disabled', () => {
		it('should have the disabled class applied', () => {
			const component = shallowRender({disabled: true});
			expect(component.hasClass(styles.disabled)).toEqual(true);
		});

		it('should execute custom `onUpdate` prop when button is clicked', () => {
			const onUpdate = jasmine.createSpy('onUpdate');
			const component = shallowRender({disabled: true, onUpdate});
			component.simulate('click');
			expect(onUpdate).not.toHaveBeenCalled();
		});
	});
});
