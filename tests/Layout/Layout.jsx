// @flow

import {type ColorsType, type PatternsType} from './../utils/SharedTypes';
import React, {type Element, PureComponent, type Ref} from 'react';
import classnames from 'classnames';
import paneStyles from './../Pane/Pane.less';
import styles from './Layout.less';
import UXPropTypes from './../utils/UXPropTypes';

type PropsType = {
	background?: ColorsType,
	children?: any,
	className?: ?string,
	// Useful if an ancestor needs to scroll or otherwise manipulate the <div> node
	divRef?: Ref<'div'>,
	// The height of this panel (in pixels or percents)
	fixedHeight?: string | number | null,
	// The width of this panel (in pixels or percents)
	fixedWidth?: string | number | null,
	// The height of this panel (between 1 and 12)
	height?: ?number,
	pattern?: PatternsType,
	style?: ?{[key: string]: any},
	// How should the layout render children (horizontal or vertical)
	type: "horizontal" | "vertical",
	// The width of this panel (between 1 and 12)
	width?: number,
};

export default class Layout extends PureComponent<PropsType> {
	static displayName = 'Layout';

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	static defaultProps = {
		type: 'horizontal',
	};

	render (): Element<'div'> {
		const {
			theme,
		} = this.context;

		const {
			background,
			className,
			divRef,
			fixedHeight,
			fixedWidth,
			height,
			pattern,
			style,
			type,
			width,
			...other
		} = this.props;

		// Class Names
		const classes = classnames(
			styles.main,
			type === 'vertical' ? styles.vertical : null,
			fixedHeight != null || fixedWidth != null ? paneStyles.fixed : null,
			fixedHeight == null || fixedWidth == null ? paneStyles.flex : null,
			height ? paneStyles[`height-${height}`] : null,
			width ? paneStyles[`width-${width}`] : null,
			(background && theme) ? theme[`paneBackground${background}`] : null,
			(pattern && theme) ? theme[`panePattern${pattern}`] : null,
			className
		);

		// Styles
		const styl = Object.assign({}, style);
		if (fixedHeight != null) styl.height = fixedHeight;
		if (fixedWidth != null) styl.width = fixedWidth;

		return (
			<div {...other} className={classes} ref={divRef} style={styl}>
				{this.props.children}
			</div>
		);
	}
}
