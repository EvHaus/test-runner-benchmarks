// @ts-expect-error Importing an internal lib
import buildFormatLongFn from 'date-fns/locale/_lib/buildFormatLongFn';
// @ts-expect-error Importing an internal lib
import type {FormatLong} from 'date-fns/locale/types';
import {formatRelative} from 'date-fns';
import React from 'react';
import styles from './DateString.module.css';
import usLocale from 'date-fns/locale/en-US';

type PropsType = {
	children?: Date | string | null,
}

const DateString = ({children}: PropsType) => {
	if (!children) return null;

	const locale = {
		...usLocale,
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		formatLong: {
			...usLocale.formatLong,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			date: buildFormatLongFn({
				formats: {
					full: 'EEEE, MMMM do, y',
					long: 'MMMM do, y',
					medium: 'MMM d, y',
					short: 'yyyy-MM-dd',
				},
				defaultWidth: 'full',
			}) as unknown,
		} as FormatLong,
	};

	return (
		<span className={styles.main}>
			{formatRelative(new Date(children), new Date(), {locale})}
		</span>
	);
};

export default DateString;
