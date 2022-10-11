import Button from '../Button';
import clsx from 'clsx';
import React from 'react';
import styles from './Pagination.module.css';

type PropsType = {
	className?: string | null,
	onNextPage: () => unknown,
	onPageChange: (page: number) => unknown,
	onPreviousPage: () => unknown,
	page: number,
	totalPages: number,
}

const MAX_OPTIONS_SHOWN = 7;

const range = (start: number, stop: number) => {
	const output = []
	for (let i = start; i <= stop; i++) {
		output.push(i)
	}
	return output
}

const getPaginationButtonContent = ({ page, totalPages }: {
	page: number,
	totalPages: number,
}): Array<number | '...'> => {
	if (totalPages <= MAX_OPTIONS_SHOWN) {
		return range(1, totalPages)
	}

	if (totalPages > MAX_OPTIONS_SHOWN && page <= 4) {
		return [...range(1, 5), '...', totalPages]
	}

	if (totalPages - page < 4) {
		return [1, '...', ...range(totalPages - 4, totalPages)]
	}

	return [1, '...', ...range(page - 1, page + 1), '...', totalPages]
}

const Pagination = ({
	className,
	onNextPage,
	onPageChange,
	onPreviousPage,
	page,
	totalPages,
}: PropsType) => {
	const isPrevEnabled = page > 1;
	const isNextEnabled = page < totalPages;

	return (
		<div className={clsx(styles.main, className)}>
			<Button
				appearance='minimal'
				icon='chevron-left'
				isDisabled={!isPrevEnabled}
				onClick={isPrevEnabled ? onPreviousPage : undefined} />
			{getPaginationButtonContent({page, totalPages}).map((option, i) => (
				option === '...' ? (
					<div className={styles.ellipsis} key={i}>...</div>
				) : (
					<Button
						appearance='minimal'
						isSelected={option === page}
						key={`${option}-${i}`}
						onClick={() => onPageChange(option)}>
						{option}
					</Button>
				)
			))}
			<Button
				appearance='minimal'
				icon='chevron-right'
				isDisabled={!isNextEnabled}
				onClick={isNextEnabled ? onNextPage : undefined} />
		</div>
	);
};

export default Pagination;
