// @flow

import React, {type ChildrenArray, type Element, type ElementRef, type Node, PureComponent} from 'react';
import Button from './../Button';
import classnames from 'classnames';
import DropdownMenu from './../DropdownMenu';
import NavItem from './../NavItem';
import styles from './DropdownButton.less';
import UXPropTypes from './../utils/UXPropTypes';
import WithBodyClick from './../WithBodyClick';

type PropsType = {
	borders: "full" | "top" | "right" | "bottom" | "left" | "none" | "horizontal" | "vertical" | "inherit",
	// There are times when the borders for the dropdown are governed outside
	// of the dropdown element, this allows for the width of the box to be
	// massaged to better fit the container
	borderWidthAdj: number,
	// Optional className to set on the button element
	buttonClassName?: string,
	children?: ChildrenArray<Element<any>>,
	className?: ?string,
	// Custom content DOM to render
	content?: Element<any>,
	// Should the button be disabled?
	disabled: boolean,
	// The width of the dropdown. If `null` will use the width of the button
	dropdownWidth?: number,
	// If part of a menu, the eventKey to return when selected
	eventKey?: string | number,
	// URL to direct user to when button is clicked
	href?: string,
	// Class name to use for the icon
	icon?: ?string,
	// The main text label to display for the button
	label?: string,
	// Class name for the label
	labelClassName?: ?string,
	// Class name to use for the dropdown menu element
	menuClassName?: ?string,
	// Function to call when an item is clicked
	onSelect: (
		event: SyntheticEvent<>,
		// Cannot use "component: ElementRef<typeof DropdownButton>" here due to:
		// https://github.com/facebook/flow/issues/5080
		component: ElementRef<any>,
		eventKey: string | number
	) => void,
	style?: *,
	title?: string,
};

type StateType = {
	isOpen: boolean,
};

export default class DropdownButton extends PureComponent<PropsType, StateType> {
	static displayName = 'DropdownButton';

	_button: ?ElementRef<typeof Button>;

	_dropdown: ?ElementRef<typeof DropdownMenu>;

	_title: ?HTMLDivElement;

	static contextTypes = {
		theme: UXPropTypes.theme,
	};

	static defaultProps = {
		borders: 'none',
		borderWidthAdj: 2,
		disabled: false,
		onSelect: (
			event: SyntheticEvent<>,
			component: ElementRef<typeof DropdownButton>,
			eventKey: string | number
		) => {},
	};

	constructor (props: PropsType) {
		super(props);

		this.state = {
			isOpen: false,
		};

		(this: any)._handleClose = this._handleClose.bind(this);
	}

	state = {
		isOpen: false,
	};

	componentDidMount () {
		// Once mounted, we can set the minWidth value
		if (this._setWidth) this._setWidth();
	}

	componentDidUpdate () {
		// Because the dimensions of the dropdown can only be calculated after it has been rendered,
		// we need to do this here.
		this._setDropdownDimensions();
	}

	render (): Element<typeof WithBodyClick> {
		const {
			borders,
			className,
			style,
		} = this.props;

		const {isOpen} = this.state;

		// Class Names
		const classes = classnames(
			styles.main,
			isOpen ? styles.mainOpen : null,
			className,
			(borders !== 'none') ? styles[`${borders}Border`] : null
		);

		return (
			<WithBodyClick onBodyClick={this._handleClose}>
				<div className={classes} style={style}>
					{this._renderTitle()}
					<div
						aria-haspopup='true'
						aria-label='DropdownButton'
						className={styles.buttonWrapper}
						role='menu'
						tabIndex='-1'>
						{this._renderButton()}
						{this._renderDropdown()}
					</div>
				</div>
			</WithBodyClick>
		);
	}

	_renderTitle (): Node {
		const {theme} = this.context;
		const {title} = this.props;

		const classes = classnames(
			styles.title,
			theme ? theme.dropdownButtonTitle : null
		);

		return title && (
			<div
				className={classes}
				ref={(node: ?HTMLDivElement) => { this._title = node; }}>
				{title}
			</div>
		);
	}

	_renderButton (): Node {
		const {
			buttonClassName,
			children,
			content,
			disabled,
			eventKey,
			href,
			icon,
			label,
			labelClassName,
			title,
		} = this.props;

		const {isOpen} = this.state;
		const buttonClasses = classnames(
			title ? styles.buttonWithTitle : null,
			buttonClassName
		);
		// The icon is whatever icon you pass as a prop, if nothing is specified
		//  it will default to an arrow
		const arrow = isOpen ? 'chevron_up' : 'chevron_down';
		const buttonIcon = icon ? icon : arrow;

		// Here we determine what it the longest string for options
		// in order to hardcode the width of the Button
		let maxLengthItem = '';
		let style;
		if (title && children) {
			React.Children.forEach(children, (child: Node) => {
				if (
					// `child` could be React.Portal, and we can't check for
					// the .props key on it.
					// flow-disable-next-line
					child && child.props &&
					typeof child.props.label === 'string' &&
					child.props.label.length > maxLengthItem.length
				) {
					maxLengthItem = child.props.label;
				}
			});

			// Where do 6.6 and 90 come from? They are estimations for common
			// values that users might use based on the current font and font
			// size. This will not work nicely for 100% of the cases, but it's a
			// good estimation for labels between 5 and 30 characters long.
			style = {minWidth: (maxLengthItem.length * 6.6) + 90};
		}

		if (content) {
			return React.cloneElement(content, {
				className: classnames(styles.button, buttonClassName, content.props.className),
				onClick: this._handleDropdownButtonClick,
			});
		}

		const labelClass = classnames(
			icon ? null : styles.label,
			labelClassName
		);

		return (
			<Button
				borders={'none'}
				className={buttonClasses}
				disabled={disabled}
				eventKey={eventKey}
				href={href}
				icon={buttonIcon}
				iconClass={icon ? null : styles.arrowIcon}
				label={label}
				labelClass={labelClass}
				onClick={this._handleDropdownButtonClick}
				ref={(node: ?ElementRef<typeof Button>) => { this._button = node; }}
				style={style} />
		);
	}

	_renderDropdown (): Element<typeof DropdownMenu> {
		const {children, eventKey, menuClassName} = this.props;
		const {isOpen} = this.state;

		return (
			<DropdownMenu
				activeKey={eventKey}
				aria-label='Dropdown Menu'
				className={menuClassName}
				isOpen={isOpen}
				onSelect={this._handleSelect}
				ref={(node: ?ElementRef<typeof DropdownMenu>) => { this._dropdown = node; }}>
				{children && React.Children.map(children, (
					child: Element<any>,
					index: number
				): ?Element<any> => {
					if (!child) return null;

					// Children that aren't NavItem elements, are
					// rendered without any special props passed down.
					if (child.type.name !== NavItem.name) return child;

					return React.cloneElement(child, {
						linkClassName: classnames(
							styles.link
						),
					});
				})}
			</DropdownMenu>
		);
	}

	_handleClose () {
		if (this.state.isOpen) this.setState({isOpen: false});
	}

	_getDropdownNode (): ?ElementRef<'nav'> {
		return (((this._dropdown || {})._menu || {})._nav || {})._node;
	}

	_getDropdownHeight (): number {
		const dropdownNode = this._getDropdownNode();
		if (!dropdownNode) return 0;

		const computedStyle = getComputedStyle(dropdownNode, '');
		const bottomBorder = parseInt(computedStyle.getPropertyValue('border-bottom-width'), 10);
		const topBorder = parseInt(computedStyle.getPropertyValue('border-top-width'), 10);
		return dropdownNode.scrollHeight + bottomBorder + topBorder;
	}

	_getDropdownWidth (): number {
		const {
			borderWidthAdj,
			dropdownWidth,
		} = this.props;

		if (dropdownWidth != null) return dropdownWidth;

		const button = this._button;
		const title = this._title;

		// If the Dropdown has a title bloc (a div) we need to account for it to set its total width
		const buttonWidth = button && button._node ? button._node.offsetWidth : 0;
		const titleWidth = title ? title.offsetWidth : 0;
		return buttonWidth + titleWidth + borderWidthAdj;
	}

	_setDropdownDimensions () {
		const dropdownNode = this._getDropdownNode();
		if (!dropdownNode) return;

		// Height will be calculated from the height of all the child elements
		dropdownNode.style.height = this.state.isOpen ? `${this._getDropdownHeight()}px` : '';
	}

	_setWidth () {
		if (!this._dropdown || !this._dropdown._menu || !this._dropdown._menu._nav) return;

		const {borderWidthAdj} = this.props;

		// Menu must be at least the width of the button
		const minWidth = `${this._getDropdownWidth()}px`;

		const dropdownNode = (((this._dropdown || {})._menu || {})._nav || {})._node;

		if (dropdownNode) {
			dropdownNode.style.minWidth = minWidth;

			// If we are adjusting the width of the dropdown, we need to have that width
			// accommodated for in the placement
			if (borderWidthAdj) {
				dropdownNode.style.marginLeft = `-${borderWidthAdj / 2}px`;
			}
		}
	}


	/*
	 * Handles the click event on the dropdown button
	 */
	_handleDropdownButtonClick = (event: SyntheticEvent<>) => {
		event.preventDefault();
		this._setWidth();
		this.setState((prevState: StateType): $Shape<StateType> => ({isOpen: !prevState.isOpen}));
	};

	/*
	 * Handles a select event from a dropdown menu item
	 */
	_handleSelect = (
		event: SyntheticEvent<>,
		component: Element<typeof DropdownMenu>,
		eventKey: string | number
	) => {
		this.props.onSelect(event, this, eventKey);
		this.setState({isOpen: false});
	};
}
