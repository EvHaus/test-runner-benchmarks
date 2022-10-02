import {describe, expect, it, vi} from 'vitest';
import Pagination from '.';
import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('<Pagination />', () => {
	const DEFAULT_PROPS = {
		onNextPage: () => {},
		onPageChange: () => {},
		onPreviousPage: () => {},
	}

	it('should render a button for each page', () => {
		const {getByText} = render(
			<Pagination {...DEFAULT_PROPS} page={1} totalPages={5} />
		);
		expect(getByText(1)).toBeDefined();
		expect(getByText(2)).toBeDefined();
		expect(getByText(3)).toBeDefined();
		expect(getByText(4)).toBeDefined();
		expect(getByText(5)).toBeDefined();
	});

	it('should render two ellipses if current page is far from both ends', () => {
		const {getAllByText} = render(
			<Pagination {...DEFAULT_PROPS} page={10} totalPages={100} />
		);
		expect(getAllByText('...')).toHaveLength(2);
	});

	it('should render an ellipsis if current page is far the end', () => {
		const {getAllByText} = render(
			<Pagination {...DEFAULT_PROPS} page={1} totalPages={10} />
		);
		expect(getAllByText('...')).toHaveLength(1);
	});

	it('should render an ellipsis if current page is far the start', () => {
		const {getAllByText} = render(
			<Pagination {...DEFAULT_PROPS} page={10} totalPages={10} />
		);
		expect(getAllByText('...')).toHaveLength(1);
	});

	it('should navigate to the page when clicking on that specific page', async () => {
		const onPageChange = vi.fn();
		const user = userEvent.setup()
		const {getByText} = render(
			<Pagination
				{...DEFAULT_PROPS}
				onPageChange={onPageChange}
				page={1}
				totalPages={5} />
		);
		await user.click(getByText(2));
		expect(onPageChange).toHaveBeenCalledWith(2);
	});
});
