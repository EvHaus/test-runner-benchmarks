import Icon, {IconNames} from '../Icon';
import clsx from 'clsx';
import React from 'react';
import styles from './Alert.module.css';

type IntentType = 'error' | 'info' | 'success' | 'warning';

type PropsType = {
	className?: string | null,
	children?: React.ReactNode,
	intent?: IntentType,
	title?: string | null,
}

const getIcon = (intent: IntentType) => {
	switch (intent) {
		case 'info': return IconNames.InfoSign;
		case 'success': return IconNames.TickCircle;
		case 'warning': return IconNames.WarningSign;
		case 'error': return IconNames.Error;
	}
	return IconNames.Error;
};

const Alert = ({
	className,
	children,
	intent = 'error',
	title,
}: PropsType) => {
	const classes = clsx(styles.main, styles[intent], className);

	return (
		<div className={classes} role='alert'>
			<Icon
				className={styles.icon}
				name={getIcon(intent)} />
			<div className={styles.text}>
				{title ? <h4 className={styles.title}>{title}</h4> : null}
				{children ? (
					<div className={styles.children}>{children}</div>
				) : null}
			</div>
		</div>
	);
};

export default Alert;
