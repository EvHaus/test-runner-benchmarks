// @flow

import React, {type ChildrenArray, type Element, type ElementRef, type Node, PureComponent} from 'react';
import {type EventKeyType} from './../NavItem/NavItem';
import NavItem from './../NavItem';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

type PropsType = {
	'aria-label': ?string, // eslint-disable-line react/no-unused-prop-types
	// The 'key' of the active child element
	activeKey?: EventKeyType,
	children?: ChildrenArray<Node>,
	className?: ?string,
	// Can the children be reordered via drag/drop
	isSortable: boolean,
	// Function to execute when an item is selected
	onSelect: (
		event: SyntheticEvent<>,
		component: ElementRef<typeof NavItem>,
		eventKey: EventKeyType
	) => void,
	// Function to execute when the items are reordered
	onSort: () => void,
	// The ARIA role to use for the component
	role: ?string,
	// Show the placeholder when sorting is enabled?
	showPlaceholder: boolean,
	// Classname to apply to all SortableItem wrapper elements
	sortableClassName?: ?string,
	style?: ?{},
	// See <ReactCSSTransitionGroup />
	transitionEnter: boolean,
	// See <ReactCSSTransitionGroup />
	transitionLeave: boolean,
	// See <ReactCSSTransitionGroup />
	transitionName?: ?string,
};

export default class Nav extends PureComponent<PropsType> {
	static displayName = 'Nav';

	_node: ?ElementRef<'nav'>;

	static defaultProps = {
		isSortable: false,
		onSort: () => {},
		showPlaceholder: false,
		transitionEnter: false,
		transitionLeave: false,
	};

	render (): ?Element<'nav' | typeof ReactCSSTransitionGroup> {
		const {isSortable, onSort, showPlaceholder, sortableClassName} = this.props;

		const nav = this._renderNav();

		// Wrap in sortable component if sorting is enabled
		if (isSortable) {
			return null
		}

		return nav;
	}

	_renderNav (): Element<'nav' | typeof ReactCSSTransitionGroup> {
		const {
			className,
			role,
			style,
			transitionEnter,
			transitionLeave,
			transitionName,
		} = this.props;

		// If transition is specified, use the TransitionGRoup
		if (transitionName) {
			return (
				<ReactCSSTransitionGroup
					className={className}
					component='nav'
					role='menu'
					style={style}
					transitionEnter={transitionEnter !== undefined ? transitionEnter : Boolean(transitionName)}
					transitionLeave={transitionLeave !== undefined ? transitionLeave : Boolean(transitionName)}
					transitionName={transitionName}>
					{this._renderNavItems()}
				</ReactCSSTransitionGroup>
			);
		}

		return (
			<nav
				aria-label={this.props['aria-label']}
				className={className}
				ref={(node: ?ElementRef<'nav'>) => { this._node = node; }}
				role={role || 'menu'}
				style={style}>
				{this._renderNavItems()}
			</nav>
		);
	}

	_renderNavItems (): Node {
		const {activeKey, children, onSelect} = this.props;

		return children && React.Children.map(children, (
			child: Element<any>,
			index: number
		): ?Element<any> => {
			if (!child) return null;

			// Ensure a key is always defined
			const key = child && child.key ? child.key : index;

			// If the child is not a NavItem or an Option, render it without
			// passing props through
			if (child.type.name !== 'Option' && child.type.name !== NavItem.name) {
				return React.cloneElement(child, {key});
			}

			let isActive = false;
			if (child.props.isActive != null) {
				isActive = child.props.isActive;
			} else if (activeKey != null && activeKey === child.props.eventKey) {
				isActive = true;
			}

			// Only allow clicking on NavItems which aren't dividers
			let onClick = () => {};
			if (child.type.name === NavItem.name && !child.props.divider) {
				onClick = onSelect;
			}

			return React.cloneElement(child, {
				key,
				isActive,
				onClick,
			});
		});
	}
}
