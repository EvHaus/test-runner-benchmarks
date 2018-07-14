// @flow

import {type ColorsType, type PatternsType} from './../utils/SharedTypes';
import React, {type Element, type Node, PureComponent, type Ref} from 'react';
import classnames from 'classnames';
import styles from './Pane.less';
import UXPropTypes from './../utils/UXPropTypes';

type PropsType = {
	background?: ColorsType,
	children?: Node,
	className?: ?string,
	// Useful if an ancestor needs to scroll or otherwise manipulate the <div> node
	divRef?: Ref<'div'>,
	// The height of this panel (in pixels or percents)
	fixedHeight?: string | number,
	// The width of this panel (in pixels or percents)
	fixedWidth?: string | number,
	// The height of this panel (between 1 and 12)
	height: number,
	pattern?: PatternsType,
	style?: ?{[key: string]: any},
	// The width of this panel (between 1 and 12)
	width?: number,
};

export default class Pane extends PureComponent<PropsType> {
	static displayName = 'Pane';

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	static defaultProps = {
		height: 0,
	};

	render (): Element<'div'> {
		const {
			theme,
		} = this.context;

		const {
			background,
			children,
			className,
			divRef,
			fixedHeight,
			fixedWidth,
			height,
			pattern,
			style,
			width,
			...other
		} = this.props;

		// Class Names
		const classes = classnames(
			styles.main,
			{[styles.fixed]: fixedHeight != null || fixedWidth != null ? true : false},
			{[styles.flex]: fixedHeight != null || fixedWidth != null ? false : true},
			height ? styles[`height-${height}`] : null,
			width ? styles[`width-${width}`] : null,
			className,
			(background && theme) ? theme[`paneBackground${background}`] : null,
			(pattern && theme) ? theme[`panePattern${pattern}`] : null
		);

		// Styles
		const styl = Object.assign({}, style);
		if (fixedHeight != null) styl.height = fixedHeight;
		if (fixedWidth != null) styl.width = fixedWidth;

		return (
			<div {...other} className={classes} ref={divRef} style={styl}>
				{children}
			</div>
		);
	}
}
