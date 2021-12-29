// @flow

import React, {type ChildrenArray, type Element, type ElementRef, PureComponent} from 'react';
import classnames from 'classnames';
import RadioButton from './../RadioButton';
import styles from './RadioGroup.module.less';

type PropsType = {
	children: ChildrenArray<Element<typeof RadioButton>>,
	className?: ?string,
	// Whether the buttons should be aligned horizontally or vertically
	layout: 'horizontal' | 'vertical',
	// The change handler function
	onUpdate: (
		event: SyntheticEvent<>,
		component: ElementRef<typeof RadioButton>,
		name: string
	) => void,
	style?: ?{},
	// Title of the Radio Group
	title?: string,
	// The current value of the radio group
	value: string,
};

export default class RadioGroup extends PureComponent<PropsType> {
	static displayName = 'RadioGroup';

	static defaultProps = {
		layout: 'horizontal',
		onUpdate: () => {},
	};

	render (): Element<'div'> {
		const {
			children,
			className,
			layout,
			onUpdate,
			style,
			title,
			value,
		} = this.props;

		const buttonsWrapperClasses = classnames(
			styles.buttonsWrapper,
			styles[`${layout}Layout`]
		);

		return (
			<div className={className} role='radiogroup' style={style}>

				{title && <div className={styles.title}>{title}</div>}

				<div className={buttonsWrapperClasses}>
					{React.Children.map(children, (
						child: ?Element<typeof RadioButton>,
						index: number
					): ?Element<typeof RadioButton> => {
						if (!child) return null;
						const key = child.key || index;
						const checked = child.props.name === value;
						return React.cloneElement(child, {
							checked,
							key,
							onUpdate,
						});
					})}
				</div>
			</div>
		);
	}
}
