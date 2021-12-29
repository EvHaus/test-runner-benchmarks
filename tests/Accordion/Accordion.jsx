// @flow

import React, {type ChildrenArray, type Element, type ElementRef, PureComponent} from 'react';
import AccordionSection from './AccordionSection';
import classnames from 'classnames';
import Immutable from 'immutable';
import Layout from './../Layout/Layout';
import UXPropTypes from './../utils/UXPropTypes';

type PropsType = {
	activeKeys: Immutable.List<*>,
	children: ?ChildrenArray<?Element<typeof AccordionSection>>,
	className?: ?string,
	onToggle: (
		event: SyntheticEvent<>,
		component: ElementRef<typeof AccordionSection>,
		newActiveKeys: Immutable.List<*>
	) => void,
	style?: ?{},
};

export default class Accordion extends PureComponent<PropsType> {
	static displayName = 'Accordion';

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	static defaultProps = {
		activeKeys: Immutable.List(),
		onToggle: () => {},
	};

	render (): Element<typeof Layout> {
		const {activeKeys, children, className, style} = this.props;
		const {theme} = this.context;

		const classes = classnames(
			theme ? theme.accordion : null,
			className
		);

		return (
			<Layout className={classes} style={style} type='vertical'>
				{children && React.Children.map(children, (
					child: ?Element<typeof AccordionSection>
				): ?Element<typeof AccordionSection> => (
					child && React.cloneElement(child, {
						isActive: activeKeys.contains(child.props.eventKey),
						onToggle: this._handleToggle,
					})
				))}
			</Layout>
		);
	}

	/*
	 * Handles the toggle event from a single AccordionSection
	 */
	_handleToggle = (
		event: SyntheticEvent<>,
		component: ElementRef<typeof AccordionSection>,
		eventKey: string
	) => {
		const {activeKeys} = this.props;
		const index = activeKeys.indexOf(eventKey);
		let newActiveKeys = activeKeys;
		if (index >= 0) {
			newActiveKeys = activeKeys.delete(index);
		} else {
			newActiveKeys = activeKeys.push(eventKey);
		}

		this.props.onToggle(event, component, newActiveKeys);
	};
}
