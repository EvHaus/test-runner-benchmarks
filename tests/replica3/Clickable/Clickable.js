// @flow

import React, {type Element, type Node, PureComponent} from 'react';
import classNames from 'classnames';
import styles from './Clickable.less';
import UXPropTypes from './../utils/UXPropTypes';

type PropsType = {
	asButton: boolean,
	children?: Node,
	className?: ?string,
	disabled: boolean,
	onClick?: (
		event: SyntheticMouseEvent<HTMLButtonElement | HTMLAnchorElement>
	) => void,
};

export default class Clickable extends PureComponent<PropsType> {
	static displayName = 'Clickable';

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	static defaultProps = {
		asButton: true,
		disabled: false,
	};

	render (): Element<'button' | 'a'> {
		const {theme} = this.context;
		const {
			asButton,
			children,
			className,
			disabled,
			onClick,
			...other
		} = this.props;

		const classes = classNames(
			styles.main,
			!disabled ? styles.enabled : false,
			!disabled && theme ? theme.clickable : null,
			disabled && theme ? theme.clickableDisabled : null,
			className
		);

		const elementType = asButton ? 'button' : 'a';

		// eslint-disable-next-line react/no-children-prop
		return React.createElement(elementType, {
			className: classes,
			children,
			onClick: disabled ? undefined : onClick,
			...other,
		});
	}
}
