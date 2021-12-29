import Button from './../Button/Button';
import React from 'react';
import {shallow} from 'enzyme';
import styles from './Toolbar.less';
import Switch from './../Switch/Switch';
import Toolbar from './Toolbar';

describe('<Toolbar />', () => {
	const shallowRender = (props) => shallow(<Toolbar {...props} />);

	it('should be my component', () => {
		const component = shallowRender();
		expect(component.instance() instanceof Toolbar).toBe(true);
	});

	it('should have the correct displayName', () => {
		expect(Toolbar.displayName).toEqual('Toolbar');
	});

	it('should have these properties by default', () => {
		const component = shallowRender();

		expect(component.instance().props).toEqual({
			fixedHeight: 64,
		});
	});

	it('should render a toolbar with elements', () => {
		const elements = [
			<Button key='hi' label='hi' />,
			<Button key='hi2' label='hi2' />,
		];
		const component = shallowRender({elements});
		expect(component.find(Button).length).toEqual(elements.length);
	});
});
