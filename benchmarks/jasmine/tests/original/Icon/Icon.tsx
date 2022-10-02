import {type IconName, iconNameToPathsRecordKey, IconSvgPaths16, IconSvgPaths20} from '@blueprintjs/icons';
import clsx from 'clsx';
import React from 'react';
import styles from './Icon.module.css';

type PropsType = {
	className?: string | null,
	name: IconName,
	size?: number,
}

type RefType = SVGSVGElement;

const renderSvgPaths = (pixelGridSize: 16 | 20, name: IconName) => {
	const svgPathsRecord = pixelGridSize === 16 ? IconSvgPaths16 : IconSvgPaths20;
	const paths = svgPathsRecord[iconNameToPathsRecordKey(name)];
	return paths.map((path, i) => (
		<path d={path} fillRule='evenodd' key={i} />
	));
};

const Icon = React.forwardRef<RefType, PropsType>(({
	className,
	name,
	size = 16,
}, ref) => {
	const pixelGridSize = size >= 20 ? 20 : 16;
	const paths = renderSvgPaths(pixelGridSize, name);
	const classes = clsx(styles.main, className);
	const viewBox = `0 0 ${pixelGridSize} ${pixelGridSize}`;

	return (
		<svg
			aria-label={name}
			className={classes}
			height={size}
			ref={ref}
			role='img'
			viewBox={viewBox}
			width={size}>
			{paths}
		</svg>
	);
});

Icon.displayName = 'Icon';

export default Icon;
