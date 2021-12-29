// @flow

import Button, {type SizeType as ButtonSizeType} from './../Button/Button';
import React, {type ChildrenArray, type Element, PureComponent} from 'react';
import {type BordersType as ButtonBordersType} from './../utils/SharedTypes';
import classnames from 'classnames';
import styles from './ButtonGroup.less';
import UXPropTypes from './../utils/UXPropTypes';

export type OutputButtonPropsType = {
	borders: ButtonBordersType,
	className: string,
	size: ButtonSizeType,
};

type BordersType = "full" | "horizontal" | "none";

type PropsType = {
	borders: BordersType,
	children?: (
		buttonProps: OutputButtonPropsType
	) => ?ChildrenArray<Element<typeof Button>>,
	className?: ?string,
	size: ButtonSizeType,
	style?: ?{[key: string]: string},
};

export default class ButtonGroup extends PureComponent<PropsType> {
	static displayName = 'ButtonGroup';

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	static defaultProps = {
		borders: 'full',
		size: 'small',
	};

	render (): Element<'div'> {
		const {
			children,
			className,
			style,
		} = this.props;

		const classes = classnames(styles.main, className);

		return (
			<div className={classes} style={style}>
				{children && children(this._getButtonProps())}
			</div>
		);
	}

	_getButtonProps (): OutputButtonPropsType {
		const {
			borders,
			size,
		} = this.props;

		const {theme} = this.context;

		return {
			borders,
			className: classnames(
				theme ? theme.buttonGroup : null,
				styles.button,
				borders !== 'none' ? styles.buttonBorders : null,
				borders === 'full' ? styles.buttonFullBorders : null
			),
			size,
		};
	}
}
