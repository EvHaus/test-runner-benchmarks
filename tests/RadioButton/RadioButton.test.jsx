import {mount, shallow} from 'enzyme';
import RadioButton from './RadioButton';
import React from 'react';
import styles from './RadioButton.less';

describe('<RadioButton />', () => {

	const fullRender = (props) => {
		return mount(<RadioButton label='something' name='somename' {...props} />);
	};

	const shallowRender = (props) => {
		return shallow(<RadioButton label='something' name='somename' {...props} />);
	};

	describe('component behaviour', () => {
		it('should be my component', () => {
			const component = shallowRender();
			expect(component.instance() instanceof RadioButton).toBe(true);
		});

		it('should have the correct displayName', () => {
			expect(RadioButton.displayName).toEqual('RadioButton');
		});

		it('should have these properties by default', () => {
			const component = shallowRender();
			const {onUpdate, ...nonFunctionalProps} = component.instance().props;

			expect(typeof onUpdate).toEqual('function');

			expect(nonFunctionalProps).toEqual({
				checked: false,
				disabled: false,
				label: 'something',
				name: 'somename',
				size: 24,
			});
		});

		it('should always be assigned the correct class', () => {
			const component = shallowRender({checked: true, label: 'Hello', name: 'hello'});
			expect(component.hasClass(styles.main)).toEqual(true);
		});

		it('should handle updates', () => {
			const component = shallowRender();
			expect(() => {
				component.setProps({checked: true});
			}).not.toThrow();
		});

		it('should fire click handler when pressing Spacebar', () => {
			const onUpdate = jasmine.createSpy();
			const component = shallowRender({onUpdate});
			component.simulate('keydown', {keyCode: 32});
			expect(onUpdate).toHaveBeenCalled();
		});
	});

	describe('user driven behaviour', () => {
		it('should execute custom `onUpdate` prop when button is clicked', () => {
			const spy = jasmine.createSpy('_handleUpdate');
			const component = shallowRender({label: 'Hello', name: 'box', onUpdate: spy});
			component.simulate('click');
			expect(spy).toHaveBeenCalled();
		});

		it('the `onUpdate` prop should not be fired if the the radio button is `disabled`', () => {
			const spy = jasmine.createSpy('_handleUpdate');
			const component = shallowRender({disabled: true, label: 'Hello', name: 'box', onUpdate: spy});
			component.simulate('click');
			expect(spy).not.toHaveBeenCalled();
		});
	});
});
