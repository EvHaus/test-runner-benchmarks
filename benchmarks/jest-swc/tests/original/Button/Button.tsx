import clsx from 'clsx';
import Icon from '../Icon';
import {type IconName} from '@blueprintjs/icons';
import React from 'react';
import Spinner from '../Spinner';
import styles from './Button.module.css';

export type PropsType = {
	appearance?: 'default' | 'minimal' | 'primary',
	ariaLabel?: string,
	className?: string | null,
	children?: React.ReactNode,
	colorKey?: 'G' | 'R' | 'V',
	icon?: IconName,
	isDisabled?: boolean,
	isLoading?: boolean,
	isSelected?: boolean,
	onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => unknown,
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => unknown,
	onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => unknown,
	onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => unknown,
	onPointerDown?: (event: React.PointerEvent<HTMLButtonElement>) => unknown,
	onPointerEnter?: (event: React.PointerEvent<HTMLButtonElement>) => unknown,
	onPointerLeave?: (event: React.PointerEvent<HTMLButtonElement>) => unknown,
	role?: 'tab',
	tabIndex?: number,
	type?: 'button' | 'submit',
}

type RefType = HTMLButtonElement;

const Button = React.forwardRef<RefType, PropsType>(({
	appearance = 'default',
	ariaLabel,
	className,
	children,
	colorKey = 'G',
	icon,
	isDisabled = false,
	isLoading = false,
	isSelected = false,
	onBlur,
	onClick,
	onFocus,
	onKeyDown,
	onPointerDown,
	onPointerEnter,
	onPointerLeave,
	role,
	tabIndex,
	type = 'button',
}, ref) => {
	const classes = clsx(
		styles.main,
		styles[appearance],
		!children && icon ? styles.iconOnly : null,
		isDisabled ? styles.disabled : null,
		isDisabled ? styles[`${appearance}${colorKey}Disabled`] : null,
		styles[`${appearance}${colorKey}`],
		isSelected ? styles.isSelected : null,
		className
	);

	return (
		<button
			aria-label={ariaLabel}
			aria-selected={isSelected}
			className={classes}
			disabled={isDisabled}
			onBlur={onBlur}
			onClick={onClick}
			onFocus={onFocus}
			onKeyDown={onKeyDown}
			onPointerDown={onPointerDown}
			onPointerEnter={onPointerEnter}
			onPointerLeave={onPointerLeave}
			ref={ref}
			role={role}
			tabIndex={tabIndex}
			type={type}>
			{
				// eslint-disable-next-line no-nested-ternary
				isLoading ? (
					<Spinner
						className={children ? styles.iconWithText : null}
						color={appearance === 'primary' ? 'white' : 'default'}
						size={14} />
				) : icon ? (
					<Icon
						className={children ? styles.iconWithText : null}
						name={icon}
						size={14} />
				) : null
			}
			{children}
		</button>
	);
});

Button.displayName = 'Button';

export default Button;
