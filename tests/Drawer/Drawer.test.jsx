import {mount, shallow} from 'enzyme';
import Drawer from './Drawer';
import React from 'react';
import {spring} from 'react-motion';
import styles from './Drawer.module.less';

describe('<Drawer />', () => {

	const shallowRender = (props) => shallow(<Drawer {...props} />);
	const fullRender = (props) => mount(
		<Drawer {...props}>
			<div />
		</Drawer>
	);

	it('should be my component', () => {
		const component = shallowRender();
		expect(component.instance() instanceof Drawer).toBe(true);
	});

	it('should have the correct displayName', () => {
		expect(Drawer.displayName).toEqual('Drawer');
	});

	it('should have these properties by default', () => {
		const component = shallowRender();
		const props = component.instance().props;
		expect(props).toEqual({
			initialHeight: 0,
			initialOpacity: 0,
			initialWidth: 0,
			isHorizontal: false,
			isOpen: false,
		});
	});

	describe('render', () => {
		it('should apply styles if isHorizontal = true', () => {
			const component = fullRender({isOpen: true, isHorizontal: true});
			expect(component.find(`.${styles.innerHorizontal}`).length).toEqual(1);
		});
	});

	describe('_getDefaultStyle', () => {
		it('should return the default styles', () => {
			const component = shallowRender();
			expect(component.instance()._getDefaultStyles()).toEqual({
				height: 0,
				opacity: 0,
				width: 0,
			});
		});
	});

	describe('_getIsAnimating', () => {
		it('should return isAnimating true if interpolating height isn\'t style height and isHorizontal = false', () => {
			const component = shallowRender();
			const interpolatingStyle = {height: 1, width: 0},
				style = {height: {val: 0}, width: {val: 0}};
			expect(component.instance()._getIsAnimating(interpolatingStyle, style)).toBe(true);
		});

		it('should return isAnimating false if interpolating height is style height and isHorizontal = false', () => {
			const component = shallowRender();
			const interpolatingStyle = {height: 0, width: 0},
				style = {height: {val: 0}, width: {val: 0}};
			expect(component.instance()._getIsAnimating(interpolatingStyle, style)).toBe(false);
		});

		it('should return isAnimating true if interpolating width isn\'t style width and isHorizontal = true', () => {
			const component = shallowRender();
			const interpolatingStyle = {height: 0, width: 1},
				isHorizontal = true,
				style = {height: {val: 0}, width: {val: 0}};
			expect(component.instance()._getIsAnimating(interpolatingStyle, style, isHorizontal)).toBe(true);
		});

		it('should return isAnimating false if interpolating width is style width and isHorizontal = true', () => {
			const component = shallowRender();
			const interpolatingStyle = {height: 0, width: 0},
				isHorizontal = true,
				style = {height: {val: 0}, width: {val: 0}};
			expect(component.instance()._getIsAnimating(interpolatingStyle, style, isHorizontal)).toBe(false);
		});
	});

	describe('_getStyles', () => {
		it('should return the correct styles if in the closed state', () => {
			const component = shallowRender();
			expect(component.instance()._getStyles()).toEqual({
				height: spring(0, {stiffness: 250}),
				opacity: spring(0, {stiffness: 250}),
				width: spring(0, {stiffness: 250}),
			});
		});

		it('should return the correct styles if in the oepn state', () => {
			const component = fullRender({isOpen: true});

			expect(component.instance()._getStyles()).toEqual({
				height: spring(0, {stiffness: 250}),
				opacity: spring(1),
				width: spring(0, {stiffness: 250}),
			});
		});
	});
});
