import describe from 'tape-describe';
import DateString from '.';
import React from 'react';
import {render} from '@testing-library/react';
import withAsyncAndTeardown from '../../../helpers/wrapper';

describe('<DateString />', (test) => {
	test('should render nothing if nothing is given', withAsyncAndTeardown((t) => {
		const {container} = render(<DateString />);
		t.equal(container.innerHTML, '');
	}));

	test('should support Date objects as children', withAsyncAndTeardown((t) => {
		const {getByText} = render(
			<DateString>{new Date(2022, 1, 1)}</DateString>
		);
		t.ok(getByText('2022-02-01'));
	}));

	test('should support strings as children', withAsyncAndTeardown((t) => {
		const {getByText} = render(
			<DateString>2022-02-01T01:02:03Z</DateString>
		);
		t.ok(getByText('2022-02-01'));
	}));

	test('should show yesterday as long form text', withAsyncAndTeardown((t) => {
		const today = new Date();
		const yesterday = new Date(today.setDate(today.getDate() - 1)).toISOString();
		const {getByText} = render(
			<DateString>{yesterday}</DateString>
		);
		t.ok(getByText(/yesterday/u));
	}));
});
