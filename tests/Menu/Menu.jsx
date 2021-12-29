// @flow

// TODO: This component should probably be deprecated. It's only use is inside
// DropdownMenu... and it really doesn't serve much purpose at this point.

import React, {type ChildrenArray, type Element, type ElementRef, type Node, PureComponent} from 'react';
import classnames from 'classnames';
import {type EventKeyType} from './../NavItem/NavItem';
import Nav from './../Nav';
import NavItem from './../NavItem';
import styles from './Menu.less';
import UXPropTypes from './../utils/UXPropTypes';

type PropsType = {
	// eslint-disable-next-line react/no-unused-prop-types
	'aria-label'?: ?string,
	// The 'key' property of the active element
	activeKey?: ?EventKeyType,
	// Class name to add to active link element
	activeLinkClass?: ?string,
	children?: ChildrenArray<Element<any>>,
	className?: ?string,
	// Class name to add to icon elements
	iconClassName?: ?string,
	// Class name to add to link label elements
	labelClassName?: ?string,
	// Class name to add to link elements
	linkClassName?: ?string,
	// Function to call when an item is selected
	onSelect: (
		event: SyntheticEvent<>,
		component: ElementRef<typeof NavItem>,
		eventKey: EventKeyType
	) => void,
	style?: ?{},
};

export default class Menu extends PureComponent<PropsType> {
	static displayName = 'Menu';

	_nav: ?ElementRef<typeof Nav>;

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	static defaultProps = {
		onSelect: () => {},
	};

	render (): Element<typeof Nav> {
		const {theme} = this.context;
		const {
			activeKey,
			children,
			className,
			onSelect,
			style,
		} = this.props;

		const classes = classnames(
			styles.main,
			theme ? theme.menu : null,
			className
		);

		return (
			<Nav
				activeKey={activeKey}
				aria-label={this.props['aria-label']}
				className={classes}
				onSelect={onSelect}
				ref={(node: ?ElementRef<typeof Nav>) => { this._nav = node; }}
				role='menu'
				style={style}>
				{children && React.Children.map(children, (
					child: ?Element<any>,
					index: number
				): Node => {
					if (!child) return null;

					// Ensure a key is always generated
					const key = child.key || child.props.eventKey || index;

					// Children that aren't NavItem elements, are
					// rendered without any special props passed down.
					if (child.type.name !== NavItem.name) {
						return React.cloneElement(child, {key});
					}

					return React.cloneElement(child, this._getNavItemProps(child, key));
				})}
			</Nav>
		);
	}

	_getNavItemProps (
		child: Element<typeof NavItem>,
		key: (string | number)
	): {[key: string]: any} {
		const {theme} = this.context;
		const {
			activeLinkClass,
			iconClassName,
			labelClassName,
			linkClassName,
		} = this.props;

		return {
			activeLinkClass: classnames(
				theme ? theme.menuLinkActive : null,
				activeLinkClass
			),
			key,
			iconClassName: classnames(
				iconClassName,
				child.props.iconClassName
			),
			labelClassName: classnames(
				labelClassName,
				child.props.labelClassName
			),
			linkClassName: classnames(
				styles.link,
				theme ? theme.menuLink : null,
				linkClassName,
				child.props.linkClassName
			),
		};
	}
}
