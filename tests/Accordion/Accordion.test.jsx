import {mount, shallow} from 'enzyme';
import Accordion from './index';
import AccordionSection from './AccordionSection';
import Immutable from 'immutable';
import React from 'react';

describe('<Accordion />', () => {
	const DEFAULT_PROPS = {};
	const fullRender = (props) => mount(<Accordion {...DEFAULT_PROPS} {...props} />);
	const shallowRender = (props) => shallow(<Accordion {...DEFAULT_PROPS} {...props} />);

	it('should be my component', () => {
		const component = shallowRender();
		expect(component.instance() instanceof Accordion).toBe(true);
	});

	it('should have the correct displayName', () => {
		expect(Accordion.displayName).toEqual('Accordion');
	});

	it('should have these properties by default', () => {
		const component = shallowRender();
		expect(component.instance().props).toEqual({
			activeKeys: Immutable.List(),
			onToggle: jasmine.any(Function),
		});
	});

	it('should handle empty children without failure', () => {
		const children = [<AccordionSection key='1' />, null, undefined, <AccordionSection key='2' />];
		const component = shallowRender({children});
		expect(component.find(AccordionSection).length).toEqual(2);
	});

	it('should support null children', () => {
		const component = shallowRender({children: null});
		expect(component.find(AccordionSection).length).toEqual(0);
	});

	it('should render <AccordionSection /> children with the right props', () => {
		const component = fullRender({children: <AccordionSection eventKey='1' title='1' />});
		const section = component.find(AccordionSection);
		expect(section.props()).toEqual({
			eventKey: '1',
			isActive: false,
			onToggle: jasmine.any(Function),
			size: 'regular',
			title: '1',
		});

		// Toggle active state
		component.setProps({activeKeys: Immutable.List(['1'])});
		const section2 = component.find(AccordionSection);
		expect(section2.props()).toEqual({
			eventKey: '1',
			isActive: true,
			onToggle: jasmine.any(Function),
			size: 'regular',
			title: '1',
		});
	});

	it('should send the right state when toggling sections on/off', () => {
		const onToggle = jasmine.createSpy();
		const component = shallowRender({onToggle});
		const event = {};
		const inner = {};
		component.instance()._handleToggle(event, inner, '1');
		expect(onToggle).toHaveBeenCalledWith(event, inner, jasmine.any(Immutable.List));
		
		component.setProps({activeKeys: Immutable.List(['1'])});
		component.instance()._handleToggle(event, inner, '2');
		expect(onToggle).toHaveBeenCalledWith(event, inner, jasmine.any(Immutable.List));

		component.setProps({activeKeys: Immutable.List(['1', '2'])});
		component.instance()._handleToggle(event, inner, '1');
		expect(onToggle).toHaveBeenCalledWith(event, inner, jasmine.any(Immutable.List));
	});
});
