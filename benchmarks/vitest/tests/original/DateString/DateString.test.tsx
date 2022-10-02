import {describe, expect, it} from 'vitest';
import DateString from '.';
import React from 'react';
import {render} from '@testing-library/react';

describe('<DateString />', () => {
	it('should render nothing if nothing is given', () => {
		const {container} = render(<DateString />);
		expect(container.innerHTML).toEqual('');
	});

	it('should support Date objects as children', () => {
		const {getByText} = render(
			<DateString>{new Date(2022, 1, 1)}</DateString>
		);
		expect(getByText('2022-02-01')).toBeDefined();
	});

	it('should support strings as children', () => {
		const {getByText} = render(
			<DateString>2022-02-01T01:02:03Z</DateString>
		);
		expect(getByText('2022-02-01')).toBeDefined();
	});

	it('should show yesterday as long form text', () => {
		const today = new Date();
		const yesterday = new Date(today.setDate(today.getDate() - 1)).toISOString();
		const {getByText} = render(
			<DateString>{yesterday}</DateString>
		);
		expect(getByText(/yesterday/u)).toBeDefined();
	});
});
