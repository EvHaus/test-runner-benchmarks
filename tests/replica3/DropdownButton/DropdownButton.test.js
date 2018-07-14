import Button from './../Button';
import classnames from 'classnames';
import DropdownButton from './DropdownButton';
import DropdownMenu from './../DropdownMenu';
import {mount} from 'enzyme';
import NavItem from './../NavItem';
import React from 'react';
import styles from './DropdownButton.less';

describe('<DropdownButton />', () => {
	const fullRender = (props, children) => {
		if (!children) {
			children = [
				<NavItem key='1' label='Action 1' />,
				<NavItem key='2' label='Action 2' />,
			];
		}

		return mount(
			<DropdownButton {...props}>
				{children}
			</DropdownButton>
		);
	};

	describe('Basic Tests', () => {
		let component;

		beforeAll(() => {
			// Using a full instead of shallow render until this react-keydown issue is resolved:
			// https://github.com/glortho/react-keydown/issues/76
			component = fullRender();
		});

		it('should be my component', () => {
			expect(component.instance() instanceof DropdownButton).toBe(true);
		});

		it('should have the correct displayName', () => {
			expect(DropdownButton.displayName).toEqual('DropdownButton');
		});

		it('should have these properties by default', () => {
			const {children, onSelect, ...nonFunctionalProps} = component.instance().props;

			expect(nonFunctionalProps).toEqual({
				borderWidthAdj: 2,
				borders: 'none',
				disabled: false,
			});

			expect(children.length).toEqual(2);
			expect(typeof onSelect).toEqual('function');
		});

	});

	describe('_renderButton', () => {
		it('should add the `labelClassName` to the `<Button />` if provided', () => {
			const component = fullRender({labelClassName: 'labelClassName'});
			const button = component.instance()._renderButton();
			expect(button.props).toEqual(jasmine.objectContaining({
				labelClass: classnames(styles.label, 'labelClassName'),
			}));
		});

		it('should the default label style if `labelClassName` is not defined', () => {
			const component = fullRender();
			const button = component.instance()._renderButton();
			expect(button.props).toEqual(jasmine.objectContaining({
				labelClass: styles.label,
			}));
		});
	});

	describe('Full Tests', () => {
		it('should contain an arrow icon if we don\'t pass a custom icon', () => {
			const component = mount(
				<DropdownButton label='All'>
					<NavItem eventKey='1' key='1' label='Comact' />
				</DropdownButton>
			);
			const button = component.find(Button);
			expect(button.prop('icon')).toEqual('chevron_down');
		});

		it('should contain a title if we pass a title prop', () => {
			const component = mount(
				<DropdownButton label='All' title='View by vendor' >
					<NavItem eventKey='1' key='1' label='Comact' />
				</DropdownButton>
			);
			const title = component.find(`.${styles.title}`);
			expect(title.text()).toEqual('View by vendor');
		});

		it('should support buttons with a title and varying children types', () => {
			const component = fullRender({label: 'All', title: 'View by vendor'}, [
				<NavItem eventKey='1' key='1' label='1' />,
				[2, 3].map((i) => (
					<NavItem eventKey={i} key={i} label={i} />
				)),
			]);
			component.setState({isOpen: true});
			expect(component.find(NavItem).length).toEqual(3);
		});

		it('should handle null|undefined children gracefully', () => {
			expect(() => {
				const component = fullRender({}, [
					undefined,
					null,
					<NavItem key={3} label='Real Item' />,
				]);

				expect(component).toBeDefined();
			}).not.toThrow();
		});

		it('should render custom DOM when given a `content` value', () => {
			const component = fullRender({content: <span>SomeContent</span>}, [
				<NavItem key={3} label='Real Item' />,
			]);

			const item = component.find('span');
			expect(item.text()).toEqual('SomeContent');
		});

		it('should set the right classes on the custom DOM in `content` value', () => {
			const component = fullRender({
				content: <span className='customDOM'>SomeContent</span>,
			}, [
				<NavItem key={3} label='Real Item' />,
			]);

			const item = component.find('.customDOM');
			expect(item.text()).toEqual('SomeContent');
		});

		it('should display a dropdown menu when clicked', () => {
			const component = fullRender({}, [
				<NavItem key='1' label='Action 1' />,
				<NavItem key='2' label='Action 2' />,
			]);

			const button = component.find(Button).first();
			const menu = component.find(DropdownMenu);

			button.simulate('click');

			expect(component.state().isOpen).toEqual(true);
			expect(menu).toBeDefined();

			// Should have at least one child
			expect(component.children().length).toEqual(1);

			// Clicking again should close the dropdown
			button.simulate('click');

			expect(component.state().isOpen).toEqual(false);
		});
	});
});
