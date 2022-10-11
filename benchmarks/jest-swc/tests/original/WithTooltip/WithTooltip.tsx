/* eslint-disable react/jsx-props-no-spreading */

import {AnimatePresence, motion} from 'framer-motion';
import {
	arrow,
	autoPlacement,
	autoUpdate,
	FloatingPortal,
	offset,
	shift,
	useDismiss,
	useFloating,
	useHover,
	useInteractions,
	useRole,
} from '@floating-ui/react-dom-interactions';
import type {Coords, Placement} from '@floating-ui/react-dom-interactions';
import React, {cloneElement, forwardRef, useRef, useState} from 'react';
import clsx from 'clsx';
import styles from './WithTooltip.module.css';

type PropsType = {
	children: JSX.Element,
	// Force placement
	placement?: Placement,
	// This is the body of the tooltip
	tooltip?: React.ReactNode | null,
};

const ARROW_SIZE = 4;

const getArrowStyle = (arrow: Partial<Coords> | undefined, placement: Placement) => {
	const arrowX = arrow?.x || 0;
	const arrowY = arrow?.y || 0;

	switch (placement) {
		case 'left':
			return {
				right: arrowX - ARROW_SIZE,
				top: arrowY,
			};
		case 'right':
			return {
				left: arrowX - ARROW_SIZE,
				top: arrowY,
			};
		case 'bottom':
			return {
				left: arrowX,
				top: arrowY - ARROW_SIZE,
			};
		default:
			return {
				left: arrowX,
				bottom: arrowY - ARROW_SIZE,
			};
	}
};

const WithTooltip = forwardRef<HTMLElement, PropsType>(({
	children,
	placement: forcedPlacement,
	tooltip,
	...parentProps
}, parentRef) => {
	const [isOpen, setIsOpen] = useState(false);
	const arrowRef = useRef(null);

	const {
		context,
		floating,
		placement: calculatedPlacement,
		reference,
		strategy,
		x,
		y,
		middlewareData: md,
	} = useFloating({
		middleware: [
			offset(8),
			autoPlacement({
				allowedPlacements: forcedPlacement ?
					[forcedPlacement] :
					['top', 'bottom'],
			}),
			shift({padding: 8}),
			arrow({element: arrowRef, padding: 8}),
		],
		onOpenChange: setIsOpen,
		open: isOpen,
		whileElementsMounted: autoUpdate,
	});

	const placement = forcedPlacement ? forcedPlacement : calculatedPlacement;

	const ref = reference;

	const {getReferenceProps, getFloatingProps} = useInteractions([
		// TODO: Form elements are auto-focused in the app for some reason.
		// Until we can figure out, keep this off.
		// useFocus(context),
		useHover(context, {move: false}),
		useRole(context, {role: 'tooltip'}),
		useDismiss(context, {referencePress: true}),
	]);

	const arrowStyle = getArrowStyle(md.arrow, placement);
	// eslint-disable-next-line no-nested-ternary
	const translateY = placement === 'bottom' ? 10 : placement === 'top' ? -10 : 0;
	// eslint-disable-next-line no-nested-ternary
	const translateX = placement === 'right' ? 10 : placement === 'left' ? -10 : 0;

	return (
		<>
			{cloneElement(
				children,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				getReferenceProps({
					ref,
					...children.props,
					...parentProps,
					onKeyDown: (event) => {
						// Dismiss if pressing Spacebar or Enter
						if (event.keyCode === 32 || event.keyCode === 13) {
							setIsOpen(false);
						}
					},
				})
			)}
			<AnimatePresence>
				{isOpen && tooltip != null ? (
					<FloatingPortal>
						<motion.div
							animate={{opacity: 1, translateX: 0, translateY: 0}}
							exit={{opacity: 0}}
							initial={{opacity: 0, translateX, translateY}}
							transition={{type: 'spring', damping: 20, stiffness: 300}}
							{...getFloatingProps({
								className: clsx(
									styles.main,
									styles[placement]
								),
								ref: floating,
								style: {
									position: strategy,
									top: y ?? 0,
									left: x ?? 0,
								},
							})}>
							{tooltip}
							<div
								className={styles.arrow}
								ref={arrowRef}
								style={arrowStyle} />
						</motion.div>
					</FloatingPortal>
				) : null}
			</AnimatePresence>
		</>
	);
});

WithTooltip.displayName = 'WithTooltip';

export default WithTooltip;
