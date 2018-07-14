// @flow

import React, {type Element, type Node, PureComponent} from 'react';
import classnames from 'classnames';
import Pane from './../Pane/Pane';
import styles from './Toolbar.less';
import UXPropTypes from './../utils/UXPropTypes';

type PropsType = {
	children?: Node,
	className?: ?string,
	elements?: Node,
	fixedHeight: number,
	style?: ?{[key: string]: string},
	subheader?: ?string,
	title?: Node,
};

export default class Toolbar extends PureComponent<PropsType> {
	static displayName = 'Toolbar';

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	static defaultProps = {
		fixedHeight: 64,
	};

	render (): Element<typeof Pane> {
		const {children, className, elements, fixedHeight, style, subheader, title} = this.props;
		const {theme} = this.context;

		const classes = classnames(
			styles.main,
			theme ? theme.toolbar : null,
			className
		);

		const titleClasses = classnames(styles.title, theme ? theme.toolbarTitle : null);

		return (
			<Pane className={classes} fixedHeight={fixedHeight} style={style}>
				{title && (
					<span
						className={titleClasses}
						title={title}>
						{title}
					</span>
				)}
				{children && (
					<div className={styles.center}>
						{children}
					</div>
				)}
				{subheader && this._renderSubheader()}
				{elements && this._renderElements()}
			</Pane>
		);
	}

	_renderElements (): Element<'nav'> {
		const {elements} = this.props;
		return (
			<nav className={styles.menu}>
				{elements}
			</nav>
		);
	}

	_renderSubheader (): Element<'div'> {
		const {theme} = this.context;
		const {subheader} = this.props;

		const subheaderClasses = classnames(
			styles.subheader,
			theme ? theme.toolbarSubheader : null
		);

		return (
			<div className={subheaderClasses}>
				{subheader}
			</div>
		);
	}
}
