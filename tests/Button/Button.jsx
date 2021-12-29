// @flow

import React, {type Element, type ElementRef, PureComponent} from 'react';
import {type BordersType} from './../utils/SharedTypes';
import classnames from 'classnames';
import styles from './Button.module.less';
import UXPropTypes from './../utils/UXPropTypes';

export type SizeType = "large" | "small";

export type PropsType = {
	// Sets the current state of the button to 'on'
	active: boolean,
	// If true, the button will have the themes default background set
	background: boolean,
	// Where should borders be drawn on the button? All sides - `i.e. full` - by default
	borders: BordersType,
	// Can this button have its `active` state removed? Off by default
	canDeactivate: boolean,
	className?: ?string,
	disabled: boolean,
	// If part of a menu, the eventKey to return when selected
	eventKey?: ?string | number,
	// URL to direct user to when button is clicked
	href?: ?string,
	// The name of the icon to display
	icon?: ?string,
	// Custom class name to add to the icon lement
	iconClass?: ?string,
	// The main text label to display for the button
	label?: ?string,
	labelClass?: ?string,
	// Styles the button with a loading spinner
	loading: boolean,
	onClick: (
		event: SyntheticMouseEvent<HTMLButtonElement>,
		// Cannot use "component: ElementRef<typeof Button>" here due to:
		// https://github.com/facebook/flow/issues/5080
		component: ElementRef<any>,
		eventKey: ?string | ?number
	) => any,
	onContextMenu: () => void,
	onMouseEnter: () => void,
	onMouseLeave: () => void,
	// What the use of the button is "primary" or "secondary"
	size: SizeType,
	style?: ?{},
	// Is the button of type "primary" or "secondary" or "task"? Currently controls the background colour
	type: "primary" | "secondary" | "task",
};

export default class Button extends PureComponent<PropsType> {
	static displayName = 'Button';

	_node: ?HTMLButtonElement;

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	// NOTE: `borders` and `size` are not specified here to allow
	//	   them to overridden by `<UX.ButtonGroup />`
	static defaultProps = {
		background: false,
		active: false,
		borders: 'full',
		canDeactivate: false,
		disabled: false,
		loading: false,
		onClick: () => {},
		onContextMenu: () => {},
		onMouseEnter: () => {},
		onMouseLeave: () => {},
		size: 'large',
		type: 'task',
	};

	render (): Element<'button'> {
		const {theme} = this.context;
		const {
			active,
			background,
			borders,
			canDeactivate,
			className,
			disabled,
			icon,
			label,
			onContextMenu,
			onMouseEnter,
			onMouseLeave,
			size,
			style,
			type,
		} = this.props;

		const borderStyle = (borders !== 'none') ? styles[`${borders}Border`] : null;
		const themeBorderStyle = null;

		let typeStyle = null;
		if (theme) typeStyle = type ? theme[`button${type}`] : theme.buttontask;

		const classes = classnames(
			styles.main,
			styles[size],
			typeStyle,
			active ? styles.active : null,
			active && theme ? theme.buttonActive : null,
			borderStyle,
			themeBorderStyle,
			(canDeactivate) ? styles.buttonDeactivatable : null,
			(canDeactivate && theme) ? theme.buttonDeactivatable : null,
			disabled ? styles.disabled : null,
			theme ? theme.button : null,
			disabled && theme ? theme.buttonDisabled : null,
			background && theme ? theme.buttonBackground : null,
			className
		);

		// What is "styles.firefox"? Well... you see, Firefox devs don't
		// think <button /> element should support Flexbox display types. So in
		// order to properly center things we need to add a wrapper element.
		// See: https://bugzilla.mozilla.org/show_bug.cgi?id=984869
		return (
			<button
				aria-label={label || icon}
				className={classes}
				onClick={this._handleClick}
				onContextMenu={onContextMenu}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				readOnly={disabled}
				ref={(node: ?HTMLButtonElement) => { this._node = node; }}
				style={style}>
				<div className={styles.firefox}>
					{icon ? this._renderIcon() : null}
					{this._renderLabel()}
				</div>
			</button>
		);
	}

	_renderIcon (): ?string {
		const {icon, iconClass, loading, size} = this.props;
		const iconClasses = classnames(
			iconClass,
			styles.icon,
			styles[`${size}-icon`],
			icon || loading ? styles['icon-on'] : null,
			icon || loading ? styles[`${size}-icon-on`] : null
		);

		const iconName = loading ? 'loading' : icon;
		if (!iconName) return null;

		return iconName;
	}

	_renderLabel (): ?Element<'span'> {
		const {label, labelClass} = this.props;
		const labelClasses = classnames(
			styles.label,
			labelClass
		);
		return label ? <span className={labelClasses}>{label}</span> : null;
	}

	getIconSize (): number {
		const {icon, loading} = this.props;
		const iconSize = 24;
		return icon || loading ? iconSize : 0;
	}

	/*
	 * Handles the onClick event for the button
	 */
	_handleClick = (event: SyntheticMouseEvent<HTMLButtonElement>) => {
		const {
			active,
			canDeactivate,
			disabled,
			eventKey,
			href,
			onClick,
		} = this.props;

		if ((active && !canDeactivate) || disabled) return;

		if (href) {
			window.location.href = href;
			return;
		}

		onClick(event, this, eventKey);
	};
}
