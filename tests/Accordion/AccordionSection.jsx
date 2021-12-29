// @flow

import React, {type Element, type ElementRef, type Node, PureComponent} from 'react';
import classnames from 'classnames';
import Clickable from './../Clickable';
import Drawer from './../Drawer';
import Layout from './../Layout/Layout';
import styles from './AccordionSection.less';
import UXPropTypes from './../utils/UXPropTypes';

type PropsType = {
	children: Node,
	className?: ?string,
	eventKey: string,
	isActive: boolean,
	onToggle: (
		event: SyntheticEvent<>,
		// Cannot use "component: ElementRef<typeof AccordionSection>" here due to:
		// https://github.com/facebook/flow/issues/5080
		component: ElementRef<any>,
		eventKey: string
	) => void,
	rightSide?: Node,
	size: 'regular' | 'small',
	style?: ?{},
	title: string,
	titleClassName?: ?string,
};

export default class AccordionSection extends PureComponent<PropsType> {
	static displayName = 'AccordionSection';

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	static defaultProps = {
		isActive: false,
		onToggle: () => {},
		size: 'regular',
	};

	render (): Element<typeof Layout> {
		const {
			children,
			className,
			isActive,
			rightSide,
			size,
			style,
			title,
			titleClassName,
		} = this.props;
		const {theme} = this.context;
		const isSmall = size === 'small';

		const classes = classnames(
			styles.main,
			theme ? theme.accordionSection : null,
			className
		);

		const titleClasses = classnames(
			styles.title,
			isSmall && styles.smallTitle,
			titleClassName
		);

		const icons = isSmall ?
			['collapse_close_small', 'collapse_open_small'] :
			['collapse_close', 'collapse_open'];

		return (
			<Layout className={classes} type='vertical'>
				<div className={titleClasses} onClick={this._handleTogglerClick}>
					<div className={styles.toggler}>
						{isActive ? icons[0] : icons[1]}
					</div>
					<span className={styles.titleText} title={title}>
						{title}
					</span>
					{rightSide ? (
						<div className={styles.rightSide}>
							{rightSide}
						</div>
					) : null}
				</div>
				<Drawer className={styles.content} isOpen={isActive} style={style}>
					{children}
				</Drawer>
			</Layout>
		);
	}

	/*
	 * Handles the click event on the toggler button
	 */
	_handleTogglerClick = (
		event: SyntheticEvent<>
	) => {
		this.props.onToggle(event, this, this.props.eventKey);
	};
}
