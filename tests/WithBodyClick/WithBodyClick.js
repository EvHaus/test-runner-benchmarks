// @flow

import React, {type ChildrenArray, type Element, PureComponent} from 'react';

type PropsType = {
	children: ChildrenArray<Element<any>>,
	onBodyClick: (event: MouseEvent) => void,
};

export default class WithBodyClick extends PureComponent<PropsType> {
	static displayName = 'WithBodyClick';

	_node: ?HTMLElement;

	static defaultProps = {
		onBodyClick: (event: MouseEvent) => {},
	};

	componentDidMount () {
		if (document.body) document.body.addEventListener('click', this._handleBodyClick);
	}

	componentWillUnmount () {
		if (document.body) document.body.removeEventListener('click', this._handleBodyClick);
	}

	render (): Element<any> {
		return React.cloneElement(React.Children.only(this.props.children), {
			ref: (node: ?HTMLElement) => { this._node = node; },
		});
	}

	_handleBodyClick = (event: MouseEvent) => {
		// If we clicked on the component, don't do anything
		// FIXME: Flow's `contains()` doesn't support the EventTarget type.
		// This should be logged as a flow bug with their team.
		// flow-disable-next-line
		if (this._node && this._node.contains(event.target)) return;

		// If we clicked outside the component, call the dismiss prop
		this.props.onBodyClick(event);
	};
}
