import {AnimatePresence, motion} from 'framer-motion';
import React, {useState} from 'react';
import clsx from 'clsx';
import Icon from '../Icon';
import styles from './Collapsible.module.css';

type PropsType = {
	className?: string | null,
	children?: React.ReactNode,
	contentClassName?: string,
	initiallyCollapsed?: boolean,
	title: React.ReactNode,
}

const TRANSITION = {
	duration: 0.5,
	type: 'spring',
};

const VARIANTS = {
	open: {height: 'auto', marginTop: 16},
	collapsed: {height: 0, marginTop: 0},
};

const Collapsible = ({
	className,
	children,
	contentClassName,
	initiallyCollapsed = false,
	title,
}: PropsType) => {
	const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed);

	const handleToggleClick = () => setIsCollapsed(!isCollapsed);

	return (
		<div className={clsx(styles.main, className)}>
			<button
				className={styles.headerButton}
				onClick={handleToggleClick}
				type='button'>
				{title}
				<Icon name={isCollapsed ? 'chevron-down' : 'chevron-up'} />
			</button>
			<AnimatePresence>
				{!isCollapsed ? (
					<motion.section
						animate='open'
						className={clsx(styles.content, contentClassName)}
						exit='collapsed'
						initial='collapsed'
						transition={TRANSITION}
						variants={VARIANTS}>
						{children}
					</motion.section>
				) : null}
			</AnimatePresence>
		</div>
	);
};

export default Collapsible;
