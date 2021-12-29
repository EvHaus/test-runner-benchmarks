// @flow

import React, {type ChildrenArray, type Element, type ElementRef, PureComponent} from 'react';
import classnames from 'classnames';
import Drawer from './../Drawer';
import Menu from './../Menu';
import menuStyles from './../Menu/Menu.less';
import NavItem from './../NavItem';
import styles from './DropdownMenu.less';
import UXPropTypes from './../utils/UXPropTypes';

type PropsType = {
	// eslint-disable-next-line react/no-unused-prop-types
	'aria-label'?: ?string,
	activeKey?: string | number,
	children?: ?ChildrenArray<Element<any>>,
	className?: ?string,
	isOpen: boolean,
	onSelect: (
		event: SyntheticEvent<>,
		component: ElementRef<any>,
		eventKey: string | number
	) => void,
	outerClassName?: ?string,
	style?: ?{},
};

export default class DropdownMenu extends PureComponent<PropsType> {
	static displayName = 'DropdownMenu';

	// Needed for parent components like DropdownButton
	_menu: ?ElementRef<typeof Menu>;

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	static defaultProps = {
		onSelect: () => {},
	};

	render (): Element<typeof Menu> {
		const {theme} = this.context;
		const {children, className, isOpen, onSelect, outerClassName, style} = this.props;

		// Class Names
		const classes = classnames(
			styles.main,
			className
		);

		const drawerClasses = classnames(
			styles.drawer,
			theme ? theme.dropdownMenu : null,
			outerClassName
		);

		return (
			<Menu
				aria-label={this.props['aria-label']}
				className={classes}
				ref={(node: ?ElementRef<typeof Menu>) => { this._menu = node; }}
				role='menu'
				style={style}>
				<Drawer isOpen={isOpen} outerClassName={drawerClasses}>
					{children && React.Children.map(children, (
						child: Element<any>,
						index: number
					): ?Element<any> => {
						if (!child) return null;

						// Ensure a key is always generated
						const key = child.key || child.props.eventKey || index;

						let props = {key};

						// Different types of children will get different types
						// of props passed down.
						if (child.type.name === NavItem.name) {
							props = Object.assign({}, props, {
								isActive: this.props.activeKey === child.props.eventKey,
								activeLinkClass: theme ? theme.menuLinkActive : null,
								className: styles.item,
								iconClassName: child.props.iconClassName,
								labelClassName: child.props.labelClassName,
								linkClassName: classnames(
									menuStyles.link,
									theme ? theme.menuLink : null,
									styles.link
								),
								onClick: onSelect,
							});
						} else if (child.type.name === 'Option') {
							props = Object.assign({}, props, {
								isActive: this.props.activeKey === child.props.eventKey,
								className: styles.item,
								onClick: onSelect,
							});
						}

						return React.cloneElement(child, props);
					})}
				</Drawer>
			</Menu>
		);
	}
}
