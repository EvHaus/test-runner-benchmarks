// @flow

import React, {type Element, PureComponent} from 'react';
import classnames from 'classnames';
import styles from './Panel.less';
import UXPropTypes from './../utils/UXPropTypes';

type PropsType = {
	children?: any,
	className?: ?string,
	// Whether the panel body is hidden
	collapsed: boolean,
	// Whether the panel body can be collapsed
	collapsible: boolean,
	// Title to display at top
	heading?: ?string,
	// Handler for panel body collapse toggling
	onCollapse: () => void,
};

export default class Panel extends PureComponent<PropsType> {
	static displayName = 'Panel';

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	static defaultProps = {
		collapsed: false,
		collapsible: true,
		onCollapse: () => {},
	};

	render (): Element<'div'> {
		const {theme} = this.context;
		const {children, className, collapsed, collapsible, heading, onCollapse} = this.props;

		const headerClasses = classnames(
			styles.heading,
			theme ? theme.panelHeading : null,
			collapsible ? styles.headingCollapsible : null
		);

		const bodyClasses = classnames(
			styles.body,
			theme ? theme.panelBody : null,
			collapsed ? styles.bodyCollapsed : null
		);

		const arrowIcon = collapsed ? 'chevron_left' : 'chevron_down';

		/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
		return (
			<div className={className}>
				<div
					className={headerClasses}
					onClick={collapsible ? onCollapse : null}
					role='heading'
					tabIndex='-1'>
					{heading}
					{collapsible ? arrowIcon : null}
				</div>
				<div aria-label='Panel Body' className={bodyClasses} role='region'>{children}</div>
			</div>
		);
		/* eslint-enable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
	}
}
