import clsx from 'clsx';
import React from 'react';
import styles from './Badge.module.css';

type PropsType = {
	className?: string | null,
	children: string,
	color?: 'blue' | 'green' | 'neutral' | 'orange' | 'purple' | 'red' | 'turquoise' | 'violet' | 'yellow',
}

const Badge = ({
	className,
	children,
	color = 'neutral',
}: PropsType) => (
	<strong
		className={clsx(styles.main, styles[color], className)}
		title={children}>
		{children}
	</strong>
);

export default Badge;
