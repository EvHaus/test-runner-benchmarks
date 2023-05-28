import clsx from 'clsx';
import React from 'react';
import styles from './Spinner.module.css';

type PropsType = {
	className?: string | null,
	color?: 'default' | 'white',
	size?: number,
}

const Spinner = ({
	className,
	color = 'default',
	size = 16,
}: PropsType) => {
	const style = {
		height: size,
		width: size,
	};

	const classes = clsx(
		styles.main,
		styles[color],
		className
	);

	return (
		<div className={classes} style={style}>
			<svg
				className={styles.svg}
				role='img'
				viewBox='0 0 150 150'
				x='0'
				y='0'>
				<circle
					className={styles.circle}
					cx='75'
					cy='75'
					r='60' />
			</svg>
		</div>
	);
};

export default Spinner;
