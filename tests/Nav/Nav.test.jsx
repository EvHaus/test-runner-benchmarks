import {mount, shallow} from 'enzyme';
import Nav from './Nav';
import NavItem from './../NavItem';
import React from 'react';

describe('<Nav />', () => {

	const DEFAULT_PROPS = {onSelect: () => {}};
	const shallowRender = (props) => shallow(<Nav {...DEFAULT_PROPS} {...props} />);
	const fullRender = (props) => mount(<Nav {...DEFAULT_PROPS} {...props} />);

	describe('basic tests', () => {
		let component;

		beforeAll(() => {
			component = shallowRender();
		});

		it('should be my component', () => {
			expect(component.instance() instanceof Nav).toBe(true);
		});

		it('should have the correct displayName', () => {
			expect(Nav.displayName).toEqual('Nav');
		});
	});

	describe('prop tests', () => {
		it('should have these properties by default', () => {
			const component = fullRender();
			const {onSelect, onSort, ...nonFunctionalProps} = component.find(Nav).props();

			expect(nonFunctionalProps).toEqual({
				isSortable: false,
				showPlaceholder: false,
				transitionEnter: false,
				transitionLeave: false,
			});

			expect(typeof onSelect).toEqual('function');
			expect(typeof onSort).toEqual('function');
		});
	});

	describe('children tests', () => {
		it('should handle null and undefined children gracefully', () => {
			const EMPTY = null;
			const EMPTY2 = undefined;
			const REAL = <NavItem label='Real Item' />;

			expect(() => {
				fullRender({children: [EMPTY, EMPTY2, REAL]});
			}).not.toThrow();
		});

		it('should only apply onClick handlers on valid <NavItem /> children', () => {
			const VALID = <NavItem />;
			const INVALID = <NavItem divider={true} />;
			const INVALID2 = <div className='plain' />;
			const onSelect = jasmine.createSpy();

			const component = fullRender({children: [VALID, INVALID, INVALID2], onSelect});

			// Click the VALID item
			const validItemLink = component.find(NavItem).find('a');
			validItemLink.simulate('click');
			expect(onSelect).toHaveBeenCalled();
			onSelect.calls.reset();

			// Click the INVALID item
			component.find(NavItem).last().simulate('click');
			expect(onSelect).not.toHaveBeenCalled();
			onSelect.calls.reset();

			// Click the INVALID2 item
			component.find('.plain').simulate('click');
			expect(onSelect).not.toHaveBeenCalled();
		});
	});
});
