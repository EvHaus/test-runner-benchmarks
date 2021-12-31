import {mount, shallow} from 'enzyme';
import Drawer from './Drawer';
import React from 'react';
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
});
