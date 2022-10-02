import clsx from 'clsx';
import React from 'react';
import styles from './Avatar.module.css';

type PropsType = {
	className?: string | null,
	colorKey?: SupportedColorsType | null,
	title?: string | null,
}

type SupportedColorsType = typeof SUPPORTED_COLORS[number];

const SUPPORTED_COLORS = [
	'N', 'B', 'G', 'Y', 'R', 'V', 'T', 'P', 'O',
] as const;

const stringToColorIndex = (str: string) => {
	// This gives us a number between 0 and 41
	const chr = (str.length ? str.charCodeAt(0) : 0) - 49;

	// This gives us an index in our supported color range
	return Math.floor(chr / (41 / SUPPORTED_COLORS.length));
};

const getColor = (initials: string, colorKey?: string | null) => {
	const colorIndex = stringToColorIndex(initials);
	const key = colorKey || SUPPORTED_COLORS[colorIndex];
	const background = `var(--${key}100)`;
	const color = `var(--${key}600)`;
	return {background, color};
};

const Avatar = ({
	className,
	colorKey,
	title,
}: PropsType) => {
	const classes = clsx(styles.main, className);
	const initials = title?.length ?
		title
			.trim()
			.split(' ')
			.map((word) => word[0].toUpperCase())
			.slice(0, 2)
			.join('') :
		null;
	const {background, color} = getColor(initials || '', colorKey);
	const style = {background, color};

	return (
		<div
			className={classes}
			style={style}
			title={title || ''}>
			{initials}
		</div>
	);
};

export default Avatar;
