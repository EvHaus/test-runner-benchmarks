import describe from 'tape-describe';
import Pagination from '.';
import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';
import withAsyncAndTeardown from '../../../helpers/wrapper';

describe('<Pagination />', (test) => {
	const DEFAULT_PROPS = {
		onNextPage: () => {},
		onPageChange: () => {},
		onPreviousPage: () => {},
	}

	test('should render a button for each page', withAsyncAndTeardown((t) => {
		const {getByText} = render(
			<Pagination {...DEFAULT_PROPS} page={1} totalPages={5} />
		);
		t.ok(getByText(1));
		t.ok(getByText(2));
		t.ok(getByText(3));
		t.ok(getByText(4));
		t.ok(getByText(5));
	}));

	test('should render two ellipses if current page is far from both ends', withAsyncAndTeardown((t) => {
		const {getAllByText} = render(
			<Pagination {...DEFAULT_PROPS} page={10} totalPages={100} />
		);
		t.equal(getAllByText('...').length, 2);
	}));

	test('should render an ellipsis if current page is far the end', withAsyncAndTeardown((t) => {
		const {getAllByText} = render(
			<Pagination {...DEFAULT_PROPS} page={1} totalPages={10} />
		);
		t.equal(getAllByText('...').length, 1);
	}));

	test('should render an ellipsis if current page is far the start', withAsyncAndTeardown((t) => {
		const {getAllByText} = render(
			<Pagination {...DEFAULT_PROPS} page={10} totalPages={10} />
		);
		t.equal(getAllByText('...').length, 1);
	}));

	test('should navigate to the page when clicking on that specific page', withAsyncAndTeardown(async (t) => {
		const onPageChange = sinon.fake();
		const user = userEvent.setup()
		const {getByText} = render(
			<Pagination
				{...DEFAULT_PROPS}
				onPageChange={onPageChange}
				page={1}
				totalPages={5} />
		);
		await user.click(getByText(2));
		t.ok(onPageChange.calledWith(2));
	}));
});
