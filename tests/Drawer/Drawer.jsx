// @flow

import {Motion, spring} from 'react-motion';
import {type PlainStyle, type Style} from 'react-motion/lib/Types';
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

	componentDidMount () {
		// When the component mounts, we'll measure children to see if the
		// drawer should be open or closed
		this._setDrawerDimensions();
	}

	UNSAFE_componentWillReceiveProps () {
		// When props change (ie. children toggled) we'll need to measure the
		// drawer size, but we don't be able to animate it in yet
		this._setDrawerDimensions();
	}

	componentDidUpdate () {
		// Finally, once updated, we can finally re-render again with the correct
		// height for animation
		this._setDrawerDimensions();
	}

	render (): Element<typeof Motion> {
		const {children, className, isHorizontal, isOpen, outerClassName, ...other} = this.props;

		// Remove things we don't want to send to the div below
		delete other.initialHeight;
		delete other.initialOpacity;
		delete other.initialWidth;

		const defaultStyle = this._getDefaultStyles();
		const style = this._getStyles();

		const outerClasses = classnames(
			styles.main,
			outerClassName
		);

		const innerClasses = classnames(
			className,
			styles.inner,
			isHorizontal && styles.innerHorizontal
		);

		return (
			<Motion defaultStyle={defaultStyle} style={style}>
				{(interpolatingStyle: PlainStyle): Element<'div'> => {
					const isAnimating = this._getIsAnimating(interpolatingStyle, style, isHorizontal);

					const height = isAnimating && !isHorizontal ? interpolatingStyle.height : style.height;
					const overflow = isAnimating ? 'hidden' : 'visible';
					const width = isAnimating && isHorizontal ? interpolatingStyle.width : style.width;

					// Occasionally the spring doesn't move down to 0 completely at the end of
					// a close transition, so we force it to 0 just in case:
					const forceToZero = !isAnimating && !isOpen;

					const styles = {
						...interpolatingStyle,
						height: (forceToZero && !isHorizontal) ? 0 : height,
						overflow,
						width: (forceToZero && isHorizontal) ? 0 : width,
					};

					return (
						<div className={outerClasses} style={styles}>
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
				}}
			</Motion>
		);
	}

	_getDefaultStyles (): PlainStyle {
		return {
			height: this.state.height,
			opacity: this.props.initialOpacity,
			width: this.state.width,
		};
	}

	_getIsAnimating (
		interpolatingStyle: PlainStyle,
		style: Style,
		isHorizontal: boolean = false
	): boolean {
		// Help flow a little bit
		const width = typeof style.width === 'object' ? style.width.val : 0;
		const height = typeof style.height === 'object' ? style.height.val : 0;

		const isAnimatingHorizontal = (isHorizontal && Math.floor(Math.abs(interpolatingStyle.width)) !== Math.floor(width));
		const isAnimatingVertical = (!isHorizontal && Math.floor(Math.abs(interpolatingStyle.height)) !== Math.floor(height));

		return isAnimatingHorizontal || isAnimatingVertical;
	}

	_getStyles (): Style {
		const {isOpen} = this.props;
		const {height, width} = this.state;

		return {
			height: isOpen ? spring(height, {stiffness: 250}) : spring(0, {stiffness: 250}),
			opacity: isOpen ? spring(1) : spring(0, {stiffness: 250}),
			width: isOpen ? spring(width, {stiffness: 250}) : spring(0, {stiffness: 250}),
		};
	}

	_setDrawerDimensions () {
		const {initialHeight, initialWidth, isOpen} = this.props;

		let height = initialHeight;
		let marginHorizontal = 0;
		let marginVertical = 0;
		let width = initialWidth;

		if (isOpen && this._node) {
			if (this._node) {
				const styles: {
					marginBottom?: number,
					marginLeft?: number,
					marginRight?: number,
					marginTop?: number,
				} = window.getComputedStyle(this._node);

				height = (this._node || {}).offsetHeight;
				marginHorizontal = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
				marginVertical = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
				width = (this._node || {}).offsetWidth;
			}
		}

		this.setState({
			height: height + marginVertical,
			width: width + marginHorizontal,
		});
	}
}
