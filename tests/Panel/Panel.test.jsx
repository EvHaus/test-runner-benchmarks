import Panel from './Panel';
import React from 'react';
import {shallow} from 'enzyme';
import styles from './Panel.module.less';

describe('<Panel />', () => {
	const shallowRender = (props) => shallow(<Panel {...props} />);

	it('should be my component', () => {
		const component = shallowRender();
		expect(component.instance() instanceof Panel).toBe(true);
	});

	it('should have the correct displayName', () => {
		expect(Panel.displayName).toEqual('Panel');
	});

	it('should handle updates', () => {
		const component = shallowRender();
		expect(() => {
			component.setProps({checked: true});
		}).not.toThrow();
	});

	it('should call `onCollapse` when the header is clicked', () => {
		const onCollapse = jasmine.createSpy();
		const component = shallowRender({onCollapse});
		component.find(`.${styles.heading}`).simulate('click');
		expect(onCollapse).toHaveBeenCalled();
	});
});
