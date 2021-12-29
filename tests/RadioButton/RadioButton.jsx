// @flow

import React, {type Element, type ElementRef, type Node, PureComponent} from 'react';
import classnames from 'classnames';
import keycode from 'keycode';
import styles from './RadioButton.module.less';
import UXPropTypes from './../utils/UXPropTypes';

type PropsType = {
	// Toggles the radio button value
	checked: boolean,
	className?: ?string,
	// Disables the radio button, which prevents actions
	disabled: boolean,
	// The aria-label value for this radio button
	label: Node,
	labelClassName?: ?string,
	name: string,
	// The change handler function
	onUpdate: (
		event: SyntheticEvent<>,
		// Cannot use "component: ElementRef<typeof RadioButton>" here due to:
		// https://github.com/facebook/flow/issues/5080
		component: ElementRef<any>,
		name: string
	) => void,
	// How big should the button be in px
	size: number,
	style?: ?{},
	// The tab index value to set on the radio button
	tabIndex?: ?string,
};

export default class RadioButton extends PureComponent<PropsType> {
	static displayName = 'RadioButton';

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	// Do not add `name` to defaultProps as an empty string, `name` will be generated into
	// the key of the change object in _handleClick
	static defaultProps = {
		checked: false,
		disabled: false,
		onUpdate: (
			event: SyntheticEvent<>,
			component: ElementRef<typeof RadioButton>,
			name: string
		) => {},
		size: 24,
	};

	render (): Element<'span'> {
		const {theme} = this.context;
		const {
			checked,
			className,
			disabled,
			label,
			labelClassName,
			size,
			style,
			tabIndex,
		} = this.props;

		const classes = classnames(
			styles.main,
			disabled ? styles.disabled : null,
			className
		);

		const icon = checked ? 'radio_on' : 'radio_off';

		const labelClasses = classnames(
			styles.label,
			theme ? theme.radiobuttonLabel : null,
			labelClassName ? labelClassName : null
		);

		const iconClasses = classnames(
			styles.labelIcon,
			theme ? theme.radiobuttonLabelIcon : null
		);

		/* eslint-disable jsx-a11y/no-static-element-interactions */
		return (
			<span
				aria-checked={checked ? 'true' : 'false'}
				aria-label={label}
				className={classes}
				onClick={this._handleClick}
				onKeyDown={this._handleKeyDown}
				role='radio'
				style={style}
				tabIndex={tabIndex || '0'}>
				<label className={labelClasses}>
					icon
					{label && <span className={classnames(styles.labelText, theme ? theme.radiobuttonLabelText : null)}>{label}</span>}
				</label>
			</span>
		);
		/* eslint-enable jsx-a11y/no-static-element-interactions */
	}

	/*
	 * Handles click event for the radio button
	 */
	_handleClick = (event: SyntheticEvent<>) => {
		const {disabled, name, onUpdate} = this.props;
		if (disabled) return;
		onUpdate(event, this, name);
	};

	/*
	 * Handles the keydown event for the radio button
	 */
	_handleKeyDown = (event: SyntheticKeyboardEvent<>) => {
		// If pressed spacebar on the focused element, consider that a toggle
		if (event.keyCode === keycode('Space')) this._handleClick(event);
	};
}
