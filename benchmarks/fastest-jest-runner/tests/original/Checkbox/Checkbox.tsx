import clsx from 'clsx';
import Icon from '../Icon';
import React from 'react';
import styles from './Checkbox.module.css';

type PropsType = {
	checked?: boolean,
	className?: string | null,
	indeterminate?: boolean,
	label?: string,
	onChange?: ((e: React.ChangeEvent<HTMLInputElement>) => unknown) | undefined,
	title?: string,
}

const getIcon = ({
	checked,
	indeterminate,
}: {
	checked: boolean,
	indeterminate: boolean,
}) => {
	if (indeterminate) return (
		<svg
			aria-label='indeterminate'
			className={styles.icon}
			height='16'
			role='img'
			viewBox='0 0 16 16'
			width='16'>
			<path d='M11 7H5c-.55 0-1 .45-1 1s.45 1 1 1h6c.55 0 1-.45 1-1s-.45-1-1-1z' fill='currentColor' fillRule='evenodd' />
		</svg>
	);
	if (checked) return <Icon className={styles.icon} name='tick' size={10} />;
	return null;
};

const Checkbox = ({
	className,
	checked = false,
	indeterminate = false,
	label,
	onChange,
	title,
}: PropsType) => {
	const classes = clsx(styles.main, className);
	const checkboxClasses = clsx(
		styles.checkbox,
		checked || indeterminate ? styles.checkboxChecked : null
	);

	return (
		<label className={classes}>
			<div className={checkboxClasses}>
				{getIcon({checked, indeterminate})}
			</div>
			<input
				checked={checked}
				className={styles.input}
				onChange={onChange}
				title={title}
				type='checkbox' />
			{label}
		</label>
	);
};

export default Checkbox;
