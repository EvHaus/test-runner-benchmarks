// @flow

import React, {type Element, type Node, PureComponent} from 'react';
import classnames from 'classnames';
import styles from './Drawer.module.less';

type PropsType = {
	children: Node,
	className?: ?string,
	initialHeight: number,
	initialOpacity: number,
	initialWidth: number,
	isHorizontal: boolean,
	isOpen: boolean,
	outerClassName?: ?string,
};

type StateType = {
	height: number,
	width: number,
};

export default class Drawer extends PureComponent<PropsType, StateType> {
	static displayName = 'Drawer';

	_node: ?HTMLDivElement;

	static defaultProps = {
		isHorizontal: false,
		isOpen: false,
		initialHeight: 0,
		initialOpacity: 0,
		initialWidth: 0,
	};

	constructor (props: PropsType) {
		super(props);

		this.state = {
			height: props.initialHeight,
			width: props.initialWidth,
		};
	}

	render (): Element<'div'> {
		const {children, className, isHorizontal, isOpen, outerClassName, ...other} = this.props;

		// Remove things we don't want to send to the div below
		delete other.initialHeight;
		delete other.initialOpacity;
		delete other.initialWidth;

		const {height, width} = this.state;

		const outerClasses = classnames(
			styles.main,
			outerClassName
		);

		const innerClasses = classnames(
			className,
			styles.inner,
			isHorizontal && styles.innerHorizontal
		);

		const isAnimating = false;

		const overflow = isAnimating ? 'hidden' : 'visible';

		// Occasionally the spring doesn't move down to 0 completely at the end of
		// a close transition, so we force it to 0 just in case:
		const forceToZero = !isAnimating && !isOpen;

		const style = {
			height: (forceToZero && !isHorizontal) ? 0 : height,
			overflow,
			width: (forceToZero && isHorizontal) ? 0 : width,
		};

		return (
			<div className={outerClasses} style={style}>
				{isOpen || isAnimating ? (
					<div
						className={innerClasses}
						ref={(node: ?HTMLDivElement) => { this._node = node; }}
						{...other}>
						{children}
					</div>
				) : null}
			</div>
		);
	}
}
