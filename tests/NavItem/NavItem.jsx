// @flow

import React, {type Element, type ElementRef, type Node, PureComponent} from 'react';
import classnames from 'classnames';
import Clickable from './../Clickable';
import keycode from 'keycode';
import styles from './NavItem.module.less';
import UXPropTypes from './../utils/UXPropTypes';

export type EventKeyType = ?string | number;

export type PropsType = {
	'aria-label'?: ?string, // eslint-disable-line react/no-unused-prop-types
	// Class name to add to active element link
	activeLinkClass?: ?string,
	className?: ?string,
	// A custom classname to add to the close button
	closeButtonClassName?: ?string,
	// Draw a little "X" icon, clicking which calls onClose
	closeIcon: boolean,
	// A custom classname to add to the close button icon
	closeIconClassName?: ?string,
	// Disables the component
	disabled: boolean,
	// Converts the item into a divider
	divider: boolean,
	// Unique identifier for the event action key
	eventKey: EventKeyType,
	// The URL to direct user to when item is clicked
	href?: ?string,
	// Name of icon to use or any custom React node
	icon?: ?string | Node,
	// Class name to add to the icon component
	iconClassName?: ?string,
	// The size of the icon in pixels
	iconSize?: number,
	// Should this component be active
	isActive?: ?boolean,
	// The label is display for the item
	label: Node,
	labelClassName?: ?string,
	// Custom class names to add to the link element
	linkClassName?: ?string,
	// Function to execute when the item is clicked
	onClick: (
		event: SyntheticEvent<>,
		// Cannot use "component: ElementRef<typeof NavItem>" here due to:
		// https://github.com/facebook/flow/issues/5080
		component: ElementRef<any>,
		eventKey: EventKeyType
	) => void,
	// Function to execute when the `closeIcon` is clicked
	onClose: (
		event: SyntheticEvent<>,
		// Cannot use "component: ElementRef<typeof NavItem>" here due to:
		// https://github.com/facebook/flow/issues/5080
		component: ElementRef<any>,
		eventKey: EventKeyType
	) => void,
	style?: ?{},
	// A "title" tag to pass to the element
	title?: ?string,
};

export default class NavItem extends PureComponent<PropsType> {
	static displayName = 'NavItem';

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	static defaultProps = {
		closeIcon: false,
		disabled: false,
		divider: false,
		onClick: () => {},
		onClose: () => {},
	};

	render (): Element<'div'> {
		const {theme} = this.context;
		const {
			activeLinkClass,
			'aria-label': ariaLabel,
			className,
			closeButtonClassName,
			closeIconClassName,
			disabled,
			divider,
			icon,
			isActive,
			label,
			linkClassName,
			style,
		} = this.props;

		// Class Names
		const classes = classnames(
			styles.main,
			divider && theme ? theme.divider : null,
			isActive ? styles.active : null,
			disabled ? styles.disabled : null,
			className
		);

		// Divider
		if (divider) return <div className={classes} style={style} />;

		const iconNode = this._renderIcon() || icon;
		const labelNode = this._renderLabel() || label;

		// Close Icon
		let closeIcon;
		if (this.props.closeIcon) {
			const closeClasses = classnames(
				styles.closeIcon,
				theme ? theme.tabCloseButton : null,
				closeButtonClassName
			);

			closeIcon = (
				<Clickable
					className={closeClasses}
					onClick={this._handleClose}>
					close_mid
				</Clickable>
			);
		}

		const linkClasses = classnames(
			styles.link,
			{[styles.linkActive]: isActive},
			linkClassName,
			isActive ? activeLinkClass : null
		);

		// Title
		const title = (
			// Use the given `title`, if available, or
			this.props.title ||
			// Use the `label`, if it's a string, or
			(typeof label === 'string' ? label : null) ||
			// Use the `aria-label`
			ariaLabel
		);

		/* eslint-disable jsx-a11y/anchor-is-valid */
		const link = (
			<a
				aria-label={ariaLabel || title || 'NavItemLink'}
				className={linkClasses}
				onClick={this._handleClick}
				onKeyDown={this._handleKeyDown}
				onKeyUp={this._handleKeyUp}
				onMouseUp={this._handleMouseUp}
				role='button'
				tabIndex='0'>
				{iconNode}
				{labelNode}
				{closeIcon}
			</a>
		);
		/* eslint-enable jsx-a11y/anchor-is-valid */

		return (
			<div
				aria-label={ariaLabel || title || 'NavItem'}
				className={classes}
				role='menuitem'
				style={style}
				tabIndex='0'
				title={title}>
				{link}
			</div>
		);
	}

	_renderIcon (): ?Element<'div'> {
		const {icon, iconClassName, iconSize} = this.props;
		if (!icon) return null;

		const iconDOM = icon;

		const classes = classnames(
			styles.icon,
			iconClassName
		);

		return (
			<div className={classes}>
				{iconDOM}
			</div>
		);
	}

	_renderLabel (): ?Element<*> {
		const {theme} = this.context;
		const {disabled, label, labelClassName} = this.props;
		if (!label) return null;

		const classes = classnames(
			styles.label,
			disabled && theme ? theme.labelDisabled : null,
			disabled ? styles.labelDisabled : null,
			labelClassName
		);

		const labelNode = (
			<span className={classes}>{label}</span>
		);

		return labelNode;
	}

	/*
	 * Click handler
	 */
	_handleClick = (event: SyntheticEvent<>) => {
		// Prevents the default onClick event from being fired.
		// We will want to control the onClick ourselves via the
		// code below.
		event.stopPropagation();

		const {disabled, eventKey, href, onClick} = this.props;

		// If disabled -- get out of here
		if (disabled) return;

		// Navigate to link
		if (href) {
			window.location.href = href;
			return;
		}

		// Pass through custom onClick
		onClick(event, this, eventKey);
	};

	/*
	 * Close button click handler
	 */
	_handleClose = (event: SyntheticEvent<>) => {
		event.stopPropagation();
		this.props.onClose(event, this, this.props.eventKey);
	};

	/*
	 * Mouse up event on the NavItem link element
	 */
	_handleMouseUp = (event: SyntheticMouseEvent<>) => {
		const {closeIcon, disabled} = this.props;

		// If disabled -- get out of here
		if (disabled) return;

		// Middle clicking will call `onClose` if item has closeIcon.
		// This must be done in `mouseup` and not in `click` because
		// Chrome doesn't support middle click onClick triggers

		// Flow disabled here due to this bug:
		// https://github.com/facebook/flow/issues/4564
		// flow-disable-next-line
		if (closeIcon && event.nativeEvent.which === 2) this._handleClose(event);
	};

	/*
	 * onDragStart handler
	 */
	_handleNativeDragStart = (event: SyntheticEvent<>) => {
		event.preventDefault();
		return;
	};

	/*
	 * Key down handler (for a11y)
	 */
	_handleKeyDown = (event: SyntheticKeyboardEvent<>) => {
		// For a11y
		if (event.keyCode === keycode('Enter')) this.props.onClick(event, this, this.props.eventKey);
	};

	/*
	 * Key up handler (for a11y)
	 */
	_handleKeyUp = (event: SyntheticKeyboardEvent<>) => {
		// For a11y
		if (event.keyCode === keycode('Space')) this.props.onClick(event, this, this.props.eventKey);
	};
}
