// @flow

import React, {type Element, PureComponent} from 'react';
import classnames from 'classnames';
import createChangeObject from './../utils/createChangeObject';
import keycode from 'keycode';
import styles from './Checkbox.less';
import UXPropTypes from './../utils/UXPropTypes';

type PropsType = {
	// Sets the state of the checkbox to checked
	checked: boolean,
	className?: ?string,
	// Sets the checkbox disabled, which prevents actions
	disabled: boolean,
	// The aria-label value for this checkbox
	label?: ?string | number | Element<any>,
	// Custom class name to add to the label wrapper
	labelClass?: ?string,
	// Custom class name to add to the label text element
	labelTextClass?: ?string,
	name: string,
	// The change handler function
	onUpdate: (
		newValue: boolean,
		changeObj: {[key: string]: boolean}
	) => void,
	style?: ?{[key: string]: any},
};

export default class Checkbox extends PureComponent<PropsType> {
	static displayName = 'Checkbox';

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	static defaultProps = {
		checked: false,
		disabled: false,
		onUpdate: () => {},
	};

	render (): Element<'span'> {
		const {theme} = this.context;
		const {checked, className, disabled, label, labelClass, labelTextClass, style} = this.props;

		const classes = classnames(
			className,
			styles.main,
			!disabled && theme ? theme.checkboxEnabled : null,
			disabled ? styles.disabled : null,
			disabled && theme ? theme.checkboxDisabled : null
		);

		const labelClasses = classnames(
			styles.label,
			theme ? theme.checkboxLabel : null,
			labelClass
		);

		const labelIconClasses = classnames(
			styles.labelIcon,
			theme ? theme.checkboxLabelIcon : null
		);

		const labelTextClasses = classnames(
			labelTextClass,
			styles.labelText,
			disabled ? styles.labelTextDisabled : null,
			!disabled ? styles.labelTextEnabled : null
		);

		const icon = checked ? 'check_on' : 'check_off';

		/* eslint-disable jsx-a11y/no-static-element-interactions */
		return (
			<span
				aria-checked={checked ? 'true' : 'false'}
				aria-label={label || 'Click to toggle checkbox'}
				className={classes}
				onClick={this._handleClick}
				onKeyDown={this._handleKeyDown}
				role='checkbox'
				style={style}
				tabIndex='0'>
				<label className={labelClasses}>
					{icon}
					{label ? <span className={labelTextClasses}>{label}</span> : null}
				</label>
			</span>
		);
		/* eslint-enable jsx-a11y/no-static-element-interactions */
	}

	// Handles the checkbox click event
	_handleClick = (
		event: SyntheticKeyboardEvent<HTMLSpanElement> | SyntheticMouseEvent<HTMLSpanElement>
	) => {
		const {checked, disabled, name} = this.props;
		if (disabled) return;

		const newValue = !checked;
		const changeObj = createChangeObject(name, newValue);

		this.props.onUpdate(newValue, changeObj);
	};

	// Handles the keydown event for the checkbox
	_handleKeyDown = (event: SyntheticKeyboardEvent<HTMLSpanElement>) => {
		// If pressed spacebar on the focused element, consider that a toggle
		if (event.keyCode === keycode('Space')) this._handleClick(event);
	};
}
