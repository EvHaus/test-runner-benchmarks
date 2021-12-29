import RadioButton from './../RadioButton';
import RadioGroup from './RadioGroup';
import React from 'react';
import {shallow} from 'enzyme';

describe('<RadioGroup />', () => {
	const shallowRender = (props) => {
		return shallow(
			<RadioGroup value='one' {...props}>
				<RadioButton label='one' name='one' />
				<RadioButton label='two' name='two' />
				<RadioButton label='three' name='three' />
			</RadioGroup>
		);
	};

	it('should be my component', () => {
		const component = shallowRender();
		expect(component.instance() instanceof RadioGroup).toBe(true);
	});

	it('should have the correct displayName', () => {
		expect(RadioGroup.displayName).toEqual('RadioGroup');
	});

	it('should have those properties by default', () => {
		const component = shallowRender();
		const {children, onUpdate, ...nonFunctionalProps} = component.instance().props;

		expect(nonFunctionalProps).toEqual({
			layout: 'horizontal',
			value: 'one',
		});

		expect(typeof onUpdate).toEqual('function');
		expect(children).toBeDefined();
	});

	it('should handle updates', () => {
		const component = shallowRender();
		expect(() => {
			component.setProps({checked: true});
		}).not.toThrow();
	});
});
