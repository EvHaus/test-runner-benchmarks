import {mount, shallow} from 'enzyme';
import AccordionSection from './AccordionSection';
import Button from './../Button';
import React from 'react';

describe('<AccordionSection />', () => {
	const DEFAULT_PROPS = {eventKey: '1', title: '1'};
	const fullRender = (props) => mount(<AccordionSection {...DEFAULT_PROPS} {...props} />);
	const shallowRender = (props) => shallow(<AccordionSection {...DEFAULT_PROPS} {...props} />);

	it('should be my component', () => {
		const component = shallowRender();
		expect(component.instance() instanceof AccordionSection).toBe(true);
	});

	it('should have the correct displayName', () => {
		expect(AccordionSection.displayName).toEqual('AccordionSection');
	});

	it('should have these properties by default', () => {
		const component = shallowRender();
		expect(component.instance().props).toEqual({
			...DEFAULT_PROPS,
			isActive: false,
			onToggle: jasmine.any(Function),
			size: 'regular',
		});
	});

	it('should call the right toggle handler', () => {
		const onToggle = jasmine.createSpy();
		const component = shallowRender({onToggle});
		const event = {};
		component.instance()._handleTogglerClick(event);
		expect(onToggle).toHaveBeenCalledWith(event, component.instance(), '1');
	});

	it('should render the right `rightSide` content', () => {
		const rightSide = <Button label='test' />;
		const component = fullRender({rightSide});
		expect(component.find(Button).length).toEqual(1, 'should render 1 button');
	});
});
