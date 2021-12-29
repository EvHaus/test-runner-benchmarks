import Button from './../Button';
import ButtonGroup from './ButtonGroup';
import classnames from 'classnames';
import React from 'react';
import {shallow} from 'enzyme';
import styles from './ButtonGroup.module.less';

describe('<ButtonGroup />', () => {

	const shallowRender = (props, children) => shallow(<ButtonGroup {...props}>{children}</ButtonGroup>);

	it('should be my component', () => {
		const component = shallowRender();
		expect(component.instance() instanceof ButtonGroup).toBe(true);
	});

	it('should have the correct displayName', () => {
		expect(ButtonGroup.displayName).toEqual('ButtonGroup');
	});

	it('should have the right properties by default', () => {
		const component = shallowRender();
		expect(component.props()).toEqual({
			className: styles.main,
			children: undefined,
			style: undefined,
		});
	});

	it('should render the right DOM elements', () => {
		const component = shallowRender(null, () => ([
			<Button className='first' key='1' />,
			<Button className='second' key='2' />,
		]));

		expect(component.first().type()).toEqual('div');
		expect(component.first().childAt(0).type()).toEqual(Button);
		expect(component.first().childAt(0).hasClass('first')).toEqual(true);
		expect(component.first().childAt(1).type()).toEqual(Button);
		expect(component.first().childAt(1).hasClass('second')).toEqual(true);
	});

	it('should be able to set a custom `className`', () => {
		const component = shallowRender();
		component.setProps({className: 'new'});
		expect(component.hasClass('new')).toEqual(true);
	});

	describe('_getButtonProps()', () => {
		it('should return the right button props by default', () => {
			const component = shallowRender();
			const buttonProps = component.instance()._getButtonProps();
			expect(buttonProps).toEqual({
				borders: 'full',
				className: classnames(
					styles.button,
					styles.buttonBorders,
					styles.buttonFullBorders
				),
				size: 'small',
			});
		});

		it('should remove borders class if `none` borders are used', () => {
			const component = shallowRender({borders: 'none'});
			const buttonProps = component.instance()._getButtonProps();
			expect(buttonProps).toEqual({
				borders: 'none',
				className: styles.button,
				size: 'small',
			});
		});

		it('should remove `full` borders class if non-`full` borders are used', () => {
			const component = shallowRender({borders: 'horizontal'});
			const buttonProps = component.instance()._getButtonProps();
			expect(buttonProps).toEqual({
				borders: 'horizontal',
				className: classnames(styles.button, styles.buttonBorders),
				size: 'small',
			});
		});
	});

	it('should support `null` children', () => {
		const component = shallowRender({borders: 'none'}, () => ([
			<Button key='1' />,
			null,
			<Button key='2' />,
		]));
		expect(component.find(Button).length).toEqual(2);
	});
});
