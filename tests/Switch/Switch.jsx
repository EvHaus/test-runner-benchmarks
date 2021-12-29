// @flow

import React, {type Element, Fragment, PureComponent} from 'react';
import classnames from 'classnames';
import styles from './Switch.module.less';
import UXPropTypes from './../utils/UXPropTypes';

export type PropsType = {
	// Is this element currently active
	active: boolean,
	className?: string,
	// If the switch is disabled or not. If true, switch will be locked in the state defined by the `active` prop.
	disabled?: boolean,
	// The text label to the right of the switch
	label?: ?string,
	labelPosition: 'left' | 'right',
	labelStyle?: ?{[key: string]: any},
	// The name of this switch
	name: string,
	// Handler for update events
	onUpdate: (active: boolean, change: {[key: string]: boolean}) => any,
	size: 'regular' | 'small',
	style?: ?{[key: string]: any},
};

export default class Switch extends PureComponent<PropsType> {
	static displayName = 'Switch';

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	static defaultProps = {
		active: false,
		disabled: false,
		labelPosition: 'right',
		onUpdate: (active: boolean, change: {[key: string]: boolean}) => {},
		size: 'regular',
	};

	render (): Element<'button'> {
		const {theme} = this.context;
		const {active, className, disabled, labelPosition, name, size, style} = this.props;
		const isSmall = size === 'small';

		const buttonClasses = classnames(
			styles.main,
			isSmall && styles.small,
			className
		);

		const switchClasses = classnames(
			styles.buttonContainer,
			isSmall && styles.smallContainer,
			theme && !disabled ? theme.switch : null,
			theme && disabled ? theme.switchDisabled : null,
			active && theme ? theme.switchActive : null
		);

		const switchButton = this._getSwitch();

		return (
			<button
				aria-checked={Boolean(active).toString()}
				className={buttonClasses}
				name={name}
				onClick={this._handleClick}
				role='checkbox'
				style={style}>
				{labelPosition === 'left' && this._renderLabel()}
				<div className={switchClasses}>
					{switchButton}
				</div>
				{labelPosition === 'right' && this._renderLabel()}
			</button>
		);
	}

	_renderLabel (): ?Element<'span'> {
		const {label, labelPosition, labelStyle} = this.props;

		const labelClass = labelPosition === 'right' ?
			styles.outerLabelRight :
			styles.outerLabelLeft;

		return label ? (
			<span
				className={labelClass}
				style={labelStyle}>
				{label}
			</span>
		) : null;
	}

	_getSwitch (): Element<typeof Fragment> {
		const {theme} = this.context;
		const {active, disabled, size} = this.props;
		const isSmall = size === 'small';

		const buttonClasses = classnames(
			styles.button,
			isSmall && styles.smallButton,
			theme ? theme.switchLabel : null,
			active ? styles.buttonActive : null,
			(active && isSmall) && styles.smallButtonActive,
			active && theme ? theme.switchLabelActive : null
		);

		const textLabelClasses = classnames(
			styles.innerLabelText,
			disabled ? styles.innerLabelTextDisabled : null,
			(!disabled && active) ? styles.innerLabelTextActive : null,
			theme ? theme.switchLabelText : null
		);

		const innerLabel = active ? 'on' : 'off';

		return (
			<Fragment>
				{!disabled ? (
					<span className={buttonClasses} />
				) : null}
				{!isSmall ? (
					<span className={textLabelClasses}>
						{innerLabel}
					</span>
				) : null}
			</Fragment>
		);
	}

	/*
	 * Handles the click event
	 */
	_handleClick = (event: SyntheticEvent<>) => {
		// We need to stop the event here so that when the Switch is used in a Row (in <Table />)
		// It doesn't fire the onRowClick() handler
		event.stopPropagation();
		const {active, disabled, name, onUpdate} = this.props;
		if (!disabled) {
			onUpdate(!active, {[name]: !active});
		}
	};
}
