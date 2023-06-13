import Pagination from '.';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, expect, it, mock} from "bun:test";
import React from 'react';

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
		expect(getAllByText('...').length).toEqual(2);
	});

	it('should render an ellipsis if current page is far the end', () => {
		const {getAllByText} = render(
			<Pagination {...DEFAULT_PROPS} page={1} totalPages={10} />
		);
		expect(getAllByText('...').length).toEqual(1);
	});

	it('should render an ellipsis if current page is far the start', () => {
		const {getAllByText} = render(
			<Pagination {...DEFAULT_PROPS} page={10} totalPages={10} />
		);
		expect(getAllByText('...').length).toEqual(1);
	});

	it('should navigate to the page when clicking on that specific page', async () => {
		const onPageChange = mock();
		const user = userEvent.setup()
		const {getByText} = render(
			<Pagination
				{...DEFAULT_PROPS}
				onPageChange={onPageChange}
				page={1}
				totalPages={5} />
		);
		await user.click(getByText(2));
		expect(onPageChange).toHaveBeenCalledTimes(1);
	});
});
